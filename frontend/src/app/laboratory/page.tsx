"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoImage from "../../public/assets/images/vbs-medical-research-hub.png";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import { issueTestResult } from "../../utils/laboratoryUtils";
import { DIDVerification } from "../../components/DIDVerification";


const TestingPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRGenerated, setIsQRGenerated] = useState(false);
  const [isHolderDIDVerified, setIsHolderDIDVerified] = useState(false);
  const [holderDID, setHolderDID] = useState("");

  const handleIssueTestResult = async () => {
    if (!holderDID) {
      console.log("holderDID is empty");
      return;
    }

    const result = await issueTestResult(holderDID, setIsLoading, setError, setQrUrl);
    console.log("issueTestResult result", result);
    if (result) {
      setIsModalOpen(true);
      setIsQRGenerated(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-12">
        <div className="flex flex-row justify-center gap-6">
          <Image src={logoImage} alt="Laboratory Logo" width={125} height={125} className="mb-2 rounded-full" priority />
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
        This platform is a <span className='text-blue-400'>`proof of concept`</span> for a pioneering approach in healthcare data management and research. By utilizing Decentralized Identifiers (DIDs), we demonstrate how you can securely share and monetize your healthcare data, while contributing to medical research.
        </p>
        <p className="text-sm text-gray-600 mb-4">
        Your role in this ecosystem is straightforward: Scan a QR code and verify your identity to receive your lab results as a Verifiable Credential. This format ensures your medical data´s confidentiality and integrity on the blockchain.
        </p>
        <p className="text-sm text-gray-600 mb-4">
        Once your results are issued, proceed to the Medical Research Hub. Here, select a research pool of your choice and scan the provided QR code with your digital wallet to share your encrypted lab results. Following this, funds will be credited to your account.
        </p>
        <p className="text-sm text-gray-600 mb-4">
        By participating, you not only access your results but also anonymously contribute to medical research, aiding in medical advancements and receiving financial incentives for your contribution.
        </p>
        {isHolderDIDVerified ? (
          <button
            onClick={handleIssueTestResult}
            disabled={isLoading}
            className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Generating..." : "Step 2: Issue Lab Result"}
          </button>
        ) : (
          <DIDVerification setHolderDID={setHolderDID} setIsHolderDIDVerified={setIsHolderDIDVerified} />
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </section>
    </div>
  );


};

export default TestingPage;