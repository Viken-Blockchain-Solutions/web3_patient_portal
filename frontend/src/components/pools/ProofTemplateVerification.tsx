"use client";
import React, { useEffect, useState } from "react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { useProofTemplate } from "../../hooks/useProofTemplate";
import Credential from "../../public/assets/images/credential.png";
import Image from "next/image";

interface ProofTemplateVerificationProps {
  setHolderCredentials: (credentials: any) => void;
  setIsProofVerified: (isVerified: boolean) => void;
}

export const ProofTemplateVerification: React.FC<ProofTemplateVerificationProps> = ({ setHolderCredentials, setIsProofVerified }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  const {
    isLoading,
    proofRequestID,
    proofRequestData,
    proofRequestStatus,
    holderDID,
    holderCredentials,
    generateProofRequestQR
  } = useProofTemplate(setQrCodeUrl);

  useEffect(() => {
    if (holderDID) {
      setHolderCredentials(holderCredentials);
      setIsProofVerified(proofRequestStatus);
    }

    // eslint-disable-next-line
  }, [holderDID, holderCredentials, proofRequestID, proofRequestData, proofRequestStatus, qrCodeGenerated]);

  const handleButtonClick = async () => {
    await generateProofRequestQR();
  };

  return (
    <div className="flex flex-col items-center">

      {qrCodeUrl ? <QRCodeGenerator url={qrCodeUrl} setQrCodeGenerated={setQrCodeGenerated} />
        :
        <Image className="mt-8 mb-5" src={Credential} height={120} width={120} sizes="100%" alt={"Reward"} />
      }
      <button
        className="btn-primary my-3"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        {isLoading ? "Generating QR Code..." : "Generate QR Code"}
      </button>


      {proofRequestStatus !== null && (
        <p className="mt-4 text-lg text-gray-700">
          Proof Request Verified:
          {proofRequestStatus ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
        </p>
      )}
    </div>
  );
};
