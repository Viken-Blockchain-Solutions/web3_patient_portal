"use client";
import React, { useEffect, useState } from "react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { useProofTemplate } from "../hooks/useProofTemplate";

interface ProofTemplateVerificationProps {
 setHolderCredentials: (credentials: any) => void;
 setIsProofVerified: (isVerified: boolean) => void;
}

export const ProofTemplateVerification: React.FC<ProofTemplateVerificationProps> = ({ setHolderCredentials, setIsProofVerified }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [error, setError] = useState("");
  const [proofID, setProofRequestID] = useState<string | undefined>(undefined);
  const [proofData, setProofRequestData] = useState<string | undefined>(undefined);

  const {
    isLoading,
    proofRequestID,
    proofRequestData,
    proofRequestStatus,
    holderDID,
    holderCredentials,
    generateProofRequestQR
  } = useProofTemplate(setQrCodeUrl, setError);

  useEffect(() => {
    if (holderDID) {
      setProofRequestID(proofRequestID);
      setProofRequestData(proofRequestData);
      setHolderCredentials(holderCredentials);
      setIsProofVerified(proofRequestStatus);
    }
    console.log("Holder Credentials:", holderCredentials);
    console.log("Holder DID:", holderDID);
    console.log("Proof Request ID:", proofID);
    console.log("Proof Request Data:", proofData);
    console.log("Proof Request Status:", proofRequestStatus);
    console.log("Proof Request QRCode:", qrCodeGenerated);
    // eslint-disable-next-line
  }, [holderDID, holderCredentials, proofRequestID, proofRequestData, proofRequestStatus, qrCodeGenerated]);

  const handleButtonClick = async () => {
    console.log("Generate QR Code button clicked");
    await generateProofRequestQR();
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="border-2 rounded-md px-4 py-2 bg-blue-600 text-white my-5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Generating QR Code..." : "Step 1: Generate QR Code"}
      </button>

      {qrCodeUrl && <QRCodeGenerator url={qrCodeUrl} setQrCodeGenerated={setQrCodeGenerated} />}

      {proofRequestStatus !== null && (
        <p className="mt-4 text-lg text-gray-700">
          Proof Request Verified:
          {proofRequestStatus ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
        </p>
      )}

      {error && proofRequestStatus !== true && (
        <p className="mt-4 text-lg text-red-500">{error}</p>
      )}
    </div>
  );
};
