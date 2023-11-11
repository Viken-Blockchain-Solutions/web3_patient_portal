'use client';
import React, { useState } from 'react';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import { apiPost, getCredentials } from '../../utils/apiUtils';
import logoImage from '../../public/assets/images/vbs-medical-research-hub.png';
import Image from 'next/image';

const NEXT_PUBLIC_ISSUER_DID = process.env.NEXT_PUBLIC_ISSUER_DID;
const NEXT_PUBLIC_DADOGG_DID = process.env.NEXT_PUBLIC_DADOGG_DID;
const NEXT_PUBLIC_THECIL_DID = process.env.NEXT_PUBLIC_THECIL_DID;
const NEXT_PUBLIC_TEST_URL = process.env.NEXT_PUBLIC_TEST_URL;

if (!NEXT_PUBLIC_ISSUER_DID || !NEXT_PUBLIC_DADOGG_DID || !NEXT_PUBLIC_THECIL_DID || !NEXT_PUBLIC_TEST_URL) {
    throw new Error('Missing required environment variables');
}

const LaboratoryPage = () => {
    const [receiverDID, setReceiverDID] = useState('');
    const [qrUrl, setQrUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isQRGenerated, setIsQRGenerated] = useState(false);
    const [error, setError] = useState('');

    const handleIssueTestResult = async () => {
        try {
            setIsLoading(true);
            setIsQRGenerated(false);
            setError('');

            const credentials = await getCredentials(NEXT_PUBLIC_ISSUER_DID, receiverDID);
            const didcommMessage = await apiPost({
                url: `${NEXT_PUBLIC_TEST_URL}/messaging/encrypt`,
                body: {
                    senderDid: NEXT_PUBLIC_ISSUER_DID,
                    recipientDids: [receiverDID],
                    type: 'issue',
                    payload: { domain: 'api.dock.io', credentials }
                }
            });

            const { qrUrl: qrUrlResponse } = await apiPost({
                url: `${NEXT_PUBLIC_TEST_URL}/messaging/send`,
                body: { to: receiverDID, message: didcommMessage.jwe }
            });

            setQrUrl(qrUrlResponse);
            setIsQRGenerated(true);
        } catch (error) {
            setError(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <header className="text-center mb-12">
                <div className="flex flex-row justify-center gap-6">
                    <Image src={logoImage} alt="Laboratory Logo" width={125} height={125} className="mb-2 rounded-full" />
                    <h1 className="text-2xl font-bold text-blue-600 mt-2">Lab Test Results</h1>
                </div>
            </header>

            <section className="mb-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works</h2>
                <p className="text-sm text-gray-600 mb-4">
                    This portal serves as a <span className='text-blue-400'>`proof of concept`</span> for a pioneering approach in healthcare data management and research. By utilizing Decentralized Identifiers (DIDs), we demonstrate how you can securely share and monetize your healthcare data, while contributing to medical research.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Here's your role in this innovative ecosystem: Enter or select your DID to receive your lab results as a Verifiable Credential. This digital format ensures the confidentiality and integrity of your medical data on the blockchain.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                    Once issued, scan the generated QR code with your digital wallet to access your encrypted lab results. In addition to obtaining your results, you have the option to anonymously contribute your data to research pools, supporting medical advancements and receiving financial incentives.
                </p>

                <label htmlFor="receiverDID" className="block text-lg font-semibold text-gray-700 mb-2">
                    Enter or Select Your DID:
                </label>
                <input
                    type="text"
                    id="receiverDID"
                    value={receiverDID}
                    onChange={(e) => setReceiverDID(e.target.value)}
                    className="block w-full px-3 py-2 mb-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Enter your unique DID here"
                />
                <select
                    onChange={(e) => setReceiverDID(e.target.value)}
                    value={receiverDID}
                    className="block w-full px-3 py-2 mb-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                    <option value="">Select a DID</option>
                    <option value={NEXT_PUBLIC_DADOGG_DID}>DADOGG DID</option>
                    <option value={NEXT_PUBLIC_THECIL_DID}>THECIL DID</option>
                </select>
                <button
                    onClick={handleIssueTestResult}
                    disabled={isLoading || !receiverDID}
                    className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Generating...' : 'Issue Test Result'}
                </button>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </section>

            <section className={`mt-8 ${!isQRGenerated && 'hidden'} max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg`}>
                {qrUrl && (
                    <>
                        <div className="flex justify-center">
                            <QRCodeGenerator url={qrUrl} />
                        </div>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            If you haven't received the lab result in your Dock wallet, you can scan the QR code above to access it.                        </p>
                    </>
                )}
            </section>
        </div>
    );


};

export default LaboratoryPage;
