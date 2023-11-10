'use client';
import React, { useState } from 'react';
import { v4 } from 'uuid';
const API_KEY = process.env.NEXT_PUBLIC_TEST_API_KEY as string;
const NEXT_PUBLIC_ISSUER_DID = process.env.NEXT_PUBLIC_ISSUER_DID;
const NEXT_PUBLIC_RECEIVER_DID = process.env.NEXT_PUBLIC_RECEIVER_DID;
const NEXT_PUBLIC_TEST_URL = process.env.NEXT_PUBLIC_TEST_URL;

console.log('NEXT_PUBLIC_TEST_API_KEY- client:', API_KEY);
console.log('NEXT_PUBLIC_ISSUER_DID - client:', NEXT_PUBLIC_ISSUER_DID);
console.log('NEXT_PUBLIC_RECEIVER_DID - client:', NEXT_PUBLIC_RECEIVER_DID);
console.log('NEXT_PUBLIC_TEST_URL - client:', NEXT_PUBLIC_TEST_URL);

// We can send multiple credentials in one message
const CREDENTIAL_COUNT = 1;

// Helper method to POST to the API
async function apiPost(url: any, body: any) {
    const result = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'DOCK-API-TOKEN': API_KEY,
      },
      body: JSON.stringify(body),
      method: 'POST'
    });
  
    const data = await result.json();
  
    if (result.status >= 400) {
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
            credential: {
                id: `urn:uuid:${v4()}`,
                name: 'Lab Test Verification',
                description: 'A verifiable credential for a lab test result.',
                type: [
                    "VerifiableCredential",
                    "LabTestVerification"
                ],
                issuer: {
                    id: NEXT_PUBLIC_ISSUER_DID,
                    name: "VBS - Labs"
                },
                subject: {
                    id: NEXT_PUBLIC_RECEIVER_DID,
                    testName: 'Lipid Panel',
                    results: {
                        totalCholesterol: {
                            value: '150',
                            unit: 'mg/dL',
                            referenceRange: '50-250 mg/dL'
                        }
                    }
                }
            }
        });
      

        /* const credential = await apiPost(`${NEXT_PUBLIC_TEST_URL}/credentials`, {
            distribute: false, // Ensure distribute is false because we're manually sending later
            credential: {
                id: `urn:uuid:${v4()}`, // Replace {{uuid}} with an actual UUID
                name: "Lab Test Verification",
                description: "A verifiable credential for a lab test result."
                type: [
                    "VerifiableCredential",
                    "LabTestVerification"
                ],
                @context: [
                    "https://www.w3.org/2018/credentials/v1",
                    "https://schema.dock.io/LabTestVerification-V1699459342994.json-ld"
                ],
                issuer: {
                    id: NEXT_PUBLIC_ISSUER_DID,
                    name: "VBS - Labs"
                },
                issuanceDate: new Date().toISOString(),
                credentialSubject: {
                    id: NEXT_PUBLIC_RECEIVER_DID,
                    testName: 'Lipid Panel',
                    results: {
                        totalCholesterol: {
                            value: '150',
                            unit: 'mg/dL',
                            referenceRange: '50-250 mg/dL'
                        }
                    }
                },
                "credentialSchema": {
                    "id": "https://schema.dock.io/LabTestVerification-V1-1699459342994.json",
                    "type": "JsonSchemaValidator2018"
                },
            }
        }); */
        

        credentials.push(credential);
    }

    return credentials;
}

// Entrypoint, will get credentials, create a didcomm message and then send that message
const main = async () => {
    if (!API_KEY) {
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

    return {
        credentials,
        didcommMessage,
        qrUrl,
        decryptData,
    };
}

const LaboratoryPage = () => {
    const [receiver, setReceiver] = useState(NEXT_PUBLIC_RECEIVER_DID || '');
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
            <pre className="text-xs p-4 bg-gray-100 rounded-md text-ellipsis">{output}</pre>
        </div>
    </div>
);
};

export default LaboratoryPage;