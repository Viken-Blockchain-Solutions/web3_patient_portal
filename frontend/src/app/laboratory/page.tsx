"use client";
import { useState } from "react";
import { LabHeader } from "../../components/LabHeader";
import { HowItWorksSection } from "../../components/HowItWorks";
import ModalComponent from "../../components/ModalComponent";

const LaboratoryPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [receiverDID, setReceiverDID] = useState("");


  return (
    <div className="container mx-auto p-4 ">
      <LabHeader />
      <section className="mb-8 max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div>
          <HowItWorksSection />
        </div>

        <ModalComponent
          buttonText="Get Lab Results"
          receiverDID={receiverDID}
          setReceiverDID={setReceiverDID}
          setQrUrl={setQrUrl}
        />

        {/* {!isHolderDIDVerified ? (
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
            setQrUrl={setQrUrl}
          />
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>} */}
      </section>
    </div>
  );
};

export default LaboratoryPage;