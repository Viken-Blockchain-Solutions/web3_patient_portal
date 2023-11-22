// frontend/src/components/pools/ProofTemplateVerification.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { useProofTemplate } from "../../hooks/useProofTemplate";
import Credential from "../../public/assets/images/credential.png";
import { ProofTemplateVerificationProps } from "../../../types";


/**
 * Renders a component for proof template verification.
 *
 * @param {ProofTemplateVerificationProps} props - The props object that contains the proof template ID, functions to set holder credentials and set proof verification status.
 * @return {ReactNode} The rendered component for proof template verification.
 */
export const ProofTemplateVerification: React.FC<ProofTemplateVerificationProps> = ({
  proofTemplateID,
  setHolderCredentials,
  setIsProofVerified
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const {
    isLoading,
    proofResponseStatus,
    holderCredentials,
    generateProofRequestQR
  } = useProofTemplate(proofTemplateID, setQrCodeUrl);

  useEffect(() => {
    if (proofResponseStatus && holderCredentials) {
      setIsProofVerified(proofResponseStatus);
      setHolderCredentials(holderCredentials);
    }
  }, [holderCredentials, proofResponseStatus]);


  const handleButtonClick = async () => {
    if (!isLoading) {
      await generateProofRequestQR();
    }
  };

  return (
    <div className="flex flex-col items-center">

      {qrCodeUrl ? <QRCodeGenerator url={qrCodeUrl} />
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


      {proofResponseStatus !== null && (
        <p className="mt-4 text-lg text-gray-700">
          Proof Request Verified:
          {proofResponseStatus ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
        </p>
      )}
    </div>
  );
};
