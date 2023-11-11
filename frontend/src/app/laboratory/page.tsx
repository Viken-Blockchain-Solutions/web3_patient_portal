"use client";
import React, { useState } from "react";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import { apiPost, getCredentials } from "../../utils/apiUtils";
import logoImage from "../../public/assets/images/vbs-medical-research-hub.png";
import Image from "next/image";

const NEXT_PUBLIC_ISSUER_DID = process.env.NEXT_PUBLIC_ISSUER_DID;
const NEXT_PUBLIC_DADOGG_DID = process.env.NEXT_PUBLIC_DADOGG_DID;
const NEXT_PUBLIC_THECIL_DID = process.env.NEXT_PUBLIC_THECIL_DID;
const NEXT_PUBLIC_TEST_URL = process.env.NEXT_PUBLIC_TEST_URL;

if (!NEXT_PUBLIC_ISSUER_DID || !NEXT_PUBLIC_DADOGG_DID || !NEXT_PUBLIC_THECIL_DID || !NEXT_PUBLIC_TEST_URL) {
  throw new Error("Missing required environment variables");
}

const LaboratoryPage = () => {
  const [receiverDID, setReceiverDID] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQRGenerated, setIsQRGenerated] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIssueTestResult = async () => {
    try {
      setIsLoading(true);
      setIsQRGenerated(false);
      setError("");

      const credentials = await getCredentials(NEXT_PUBLIC_ISSUER_DID, receiverDID);

      console.log("Creating DIDComm message with", credentials.length, " credentials");

      const didcommMessage = await apiPost({
        url: `${NEXT_PUBLIC_TEST_URL}/messaging/encrypt`,
        body: {
          senderDid: NEXT_PUBLIC_ISSUER_DID,
          recipientDids: [receiverDID],
          type: "issue",
          payload: { domain: "api.dock.io", credentials }
        }
      });

      const { qrUrl: qrUrlResponse } = await apiPost({
        url: `${NEXT_PUBLIC_TEST_URL}/messaging/send`,
        body: { to: receiverDID, message: didcommMessage.jwe }
      });

      console.log("Sent message, QR url can be used also:", qrUrlResponse);

      setQrUrl(qrUrlResponse);
      setIsQRGenerated(true);
      setIsModalOpen(true);
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal Content */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            Congratulations
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                                                A LabResult Credential is now issued to your DID:dock, you can find the credential in your Dock Wallet mobile application. If you have not received the credential, try scanning this QR code to receive it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {isQRGenerated && qrUrl && (
                <div className="mt-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex justify-center">
                    <QRCodeGenerator url={qrUrl} />
                  </div>
                </div>
              )}
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                                    Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="mb-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">How It Works</h2>
        <p className="text-sm text-gray-600 mb-4">
                    This portal serves as a <span className='text-blue-400'>`proof of concept`</span> for a pioneering approach in healthcare data management and research. By utilizing Decentralized Identifiers (DIDs), we demonstrate how you can securely share and monetize your healthcare data, while contributing to medical research.
        </p>
        <p className="text-sm text-gray-600 mb-4">
                    Here´s your role in this innovative ecosystem: Enter or select your DID to receive your lab results as a Verifiable Credential. This digital format ensures the confidentiality and integrity of your medical data on the blockchain.
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
          className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Generating..." : "Issue Test Result"}
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </section>
    </div>
  );


};

export default LaboratoryPage;
