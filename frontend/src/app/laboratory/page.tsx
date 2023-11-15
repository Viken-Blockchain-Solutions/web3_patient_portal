// app/laboratory/page.tsx
"use client";
import { useState } from "react";
import { LabHeader } from "../../components/LabHeader";
import { HowItWorksSection } from "../../components/HowItWorks";
import ModalComponent from "../../components/ModalComponent";
import GoToMedicalHubButton from "../../components/GoToMedicalHub";
import Link from "next/link";

const LaboratoryPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [receiverDID, setReceiverDID] = useState("");
  const [error, setError] = useState("");
  const [credentialIssued, setCredentialIssued] = useState(false);
  const [credentialId, setCredentialId] = useState("");

  return (
    <div className="container mx-auto p-4 mt-16">
      <LabHeader />
      <section className="mb-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div>
          <HowItWorksSection />
        </div>
        {credentialId && (
          <div className="p-4 mt-4 rounded-md bg-green-100">
            <h3 className="text-green-800 text-lg font-semibold">Your Lab Result was created successfully!</h3>
            <p className="text-green-800">Follow this link to scan your QRcode to import your Lab Result into your Dock Wallet:</p>
            <Link
              href={credentialId}
              className="text-blue-800 font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential
            </Link>
          </div>
        )}
        {error && (
          <div className="p-4 mt-4 rounded-md bg-red-100">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!credentialIssued ? (
          <ModalComponent
            buttonText="Get Lab Results"
            receiverDID={receiverDID}
            error={error}
            qrUrl={qrUrl}
            credentialIssued={credentialIssued}
            setCredentialId={setCredentialId}
            setCredentialIssued={setCredentialIssued}
            setReceiverDID={setReceiverDID}
            setError={setError}
            setQrUrl={setQrUrl}
          />) : (<GoToMedicalHubButton />)}
      </section>
    </div>
  );
};

export default LaboratoryPage;