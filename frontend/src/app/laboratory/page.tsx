"use client";
import { useState } from "react";
import { DIDVerification } from "../../components/DIDVerification";
import { LabHeader } from "../../components/LabHeader";
import { HowItWorksSection } from "../../components/HowItWorks";
import { QRCodeGenerator } from "../../components/QRCodeGenerator";
import { IssueVCLabButton } from "../../components/IssueVCLabButton";

const LaboratoryPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHolderDIDVerified, setIsHolderDIDVerified] = useState(false);
  const [holderDID, setHolderDID] = useState("");

  return (
    <div className="container mx-auto p-4">
      <LabHeader />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <QRCodeGenerator
            url={qrUrl}
          />
        </div>
      )}

      <section className="mb-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        <HowItWorksSection />
        {isHolderDIDVerified ? (
          <IssueVCLabButton
            props={{
              holderDID,
              setQrUrl,
              setError,
              setIsModalOpen
            }}/>
        ) : (
          <DIDVerification
            setHolderDID={setHolderDID}
            setIsHolderDIDVerified={setIsHolderDIDVerified}
          />
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </section>
    </div>
  );

};

export default LaboratoryPage;