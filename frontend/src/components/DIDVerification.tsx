"use client";
import { useEffect, useState } from "react";
import { QRCodeGenerator } from "./pools/QRCodeGenerator";
import { useDIDVerification } from "../hooks/useDIDVerification";

export const DIDVerification = ({ setHolderDID, setIsHolderDIDVerified }: any) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Use the custom hook here
  const {
    isLoading,
    proofRequestStatus,
    holderDID,
    generateDIDVerificationQR
  } = useDIDVerification(setQrCodeUrl);

  useEffect(() => {
    if (holderDID) {
      setHolderDID(holderDID);
      setIsHolderDIDVerified(true);
    }

  }, [holderDID, setHolderDID, setIsHolderDIDVerified]);

  return (
    <div className="flex flex-col items-center">
      <button className="border-2 rounded-md px-4 py-2 bg-blue-600 text-white my-5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
        onClick={generateDIDVerificationQR}
        disabled={isLoading}>
        {isLoading ? "Generating QR Code..." : "Step 1: Generate QR Code"}
      </button>

      {qrCodeUrl && <QRCodeGenerator url={qrCodeUrl} />}

      {proofRequestStatus !== null && (
        <p className="mt-4 text-lg text-gray-700">
          Proof Request Verified:
          {proofRequestStatus ? <span className="text-green-500">Yes</span> : <span className="text-red-500">No</span>}
        </p>
      )}
      {holderDID && (setIsHolderDIDVerified(true))}
    </div>
  );
};

