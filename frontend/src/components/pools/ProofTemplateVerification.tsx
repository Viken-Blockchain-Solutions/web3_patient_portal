"use client";
import React, { useEffect, useState } from "react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { useProofTemplate } from "../../hooks/useProofTemplate";
import Credential from "../../public/assets/images/credential.png";
import Image from "next/image";

interface ProofTemplateVerificationProps {
  proofTemplate: string,
  setHolderCredentials: (credentials: any) => void;
  setIsProofVerified: (isVerified: boolean) => void;
}

/**
 * Renders a component for verifying a proof template.
 *
 * @param {ProofTemplateVerificationProps} props - The props for the component.
 * @param {ProofTemplate} props.proofTemplate - The proof template to be verified.
 * @param {function} props.setHolderCredentials - The function to set the holder credentials.
 * @param {function} props.setIsProofVerified - The function to set the proof verification status.
 * @return {JSX.Element} - The JSX element for the component.
 */
export const ProofTemplateVerification: React.FC<ProofTemplateVerificationProps> = ({
  proofTemplate,
  setHolderCredentials,
  setIsProofVerified
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const {
    isLoading,
    proofResponseStatus,
    holderCredentials,
    generateProofRequestQR
  } = useProofTemplate(proofTemplate, setQrCodeUrl);

  useEffect(() => {
    if (proofResponseStatus && holderCredentials) {
      setIsProofVerified(proofResponseStatus);
      setHolderCredentials(holderCredentials);
    }
    // eslint-disable-next-line
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
