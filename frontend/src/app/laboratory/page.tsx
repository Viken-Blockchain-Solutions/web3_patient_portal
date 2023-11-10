'use client';
import React, { useState } from 'react';
import { v4 } from 'uuid';

const { NEXT_PUBLIC_TEST_API_KEY, NEXT_PUBLIC_ISSUER_DID, NEXT_PUBLIC_RECEIVER_DID, NEXT_PUBLIC_TEST_URL } = process.env;

// We can send multiple credentials in one message
const CREDENTIAL_COUNT = 1;

// Helper method to POST to the API
async function apiPost(url: string, body: any) {
    const response = await fetch(`${NEXT_PUBLIC_TEST_URL}/credentials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': NEXT_PUBLIC_TEST_API_KEY as string,
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.status >= 400) {
        throw new Error(`API Error: ${data}`);
    }

    return data;
}

// Gets credentials to send, they could be pulled from DB or previous response
// for the sample we will just issue a credential with the API
async function getCredentials() {
    const credentials = [];
    for (let i = 0; i < CREDENTIAL_COUNT; i++) {
        const credential = await apiPost(`${NEXT_PUBLIC_TEST_URL}/credentials`, {
            distribute: false, // Ensure distribute is false because were manually sending later
            persistent: true, // Ensure persistent is true so we can send the message later
            "credential": {
                "id": `urn:uuid:${v4()}`, // Replace {{uuid}} with an actual UUID
                "@context": [
                    "https://www.w3.org/2018/credentials/v1",
                    "https://schema.dock.io/LabTestVerification-V1699459342994.json-ld"
                ],
                "type": [
                    "VerifiableCredential",
                    "LabTestVerification"
                ],
                "issuer": {
                    "id": NEXT_PUBLIC_ISSUER_DID,
                    "name": "VBS - Labs"
                },
                "issuanceDate": new Date().toISOString(),
                "credentialSubject": {
                    "id": NEXT_PUBLIC_RECEIVER_DID,
                    "testName": "Lipid Panel",
                    "results": {
                        "totalCholesterol": {
                            "value": "150",
                            "unit": "mg/dL",
                            "referenceRange": "50-250 mg/dL"
                        }
                    }
                },
                "credentialSchema": {
                    "id": "https://schema.dock.io/LabTestVerification-V1-1699459342994.json",
                    "type": "JsonSchemaValidator2018"
                },
                "name": "Lab Test Verification",
                "description": "A verifiable credential for a lab test result."
            }
        });

        credentials.push(credential);
    }

    return credentials;
}

// Entrypoint, will get credentials, create a didcomm message and then send that message
async function main() {
    if (!NEXT_PUBLIC_TEST_API_KEY) {
        throw new Error('Setup .env file');
    }

    // Get credentials to send
    const credentials = await getCredentials();
    console.log('Creating DIDComm message with', credentials.length, ' credentials')

    // Create an encrypted didcomm message
    const didcommMessage = await apiPost(`${NEXT_PUBLIC_TEST_URL}/messaging/encrypt`, {
        senderDid: NEXT_PUBLIC_ISSUER_DID,
        recipientDids: [NEXT_PUBLIC_RECEIVER_DID, NEXT_PUBLIC_ISSUER_DID],
        type: 'issue', // Message type is important for the wallet to recognize it
        payload: {
            // You can set this domain to be whatever you like, or base it from a DID/issuer profile
            domain: 'api.dock.io',

            // Credentials is an array of signed VCs
            credentials,
        }
    });

    // Finally, send the message to the user's wallets/generate QR
    // you can optionally skip this step and distribute the didcomm message another way
    const { qrUrl } = await apiPost(`${NEXT_PUBLIC_TEST_URL}/messaging/send`, {
        to: NEXT_PUBLIC_RECEIVER_DID,
        message: didcommMessage.jwe,
    });

    console.log('Sent message, QR url can be used also:', qrUrl);

    // For debugging, we can show the decrypted contents since we specified
    // a DID we control as a recipient DID
    const decryptData = await apiPost(`${NEXT_PUBLIC_TEST_URL}/messaging/decrypt`, didcommMessage);
    console.log('Decrypted message:', decryptData)
}

export const LaboratoryPage = () => {
    const [receiver, setReceiver] = useState(NEXT_PUBLIC_RECEIVER_DID);
    const [output, setOutput] = useState('');

    const handleMain = async () => {
        try {
            const result = await main();
            setOutput(JSON.stringify(result, null, 2));
        } catch (error: any) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Laboratory</h1>
        <div className="mb-4">
            <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">Receiver DID:</label>
            <input
                type="text"
                id="receiver"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <select
                onChange={(e) => setReceiver(e.target.value)}
                value={receiver}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value={NEXT_PUBLIC_RECEIVER_DID}>{NEXT_PUBLIC_RECEIVER_DID}</option>
                {/* Add other options here if needed */}
            </select>
        </div>
        <button 
            onClick={handleMain}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Execute
        </button>
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Output:</h2>
            <pre className="p-4 bg-gray-100 rounded-md">{output}</pre>
        </div>
    </div>
);
};