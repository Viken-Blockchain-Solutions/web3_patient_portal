"use client";
import { useState } from "react";
import Image from "next/image";
import Potion from "../../public/assets/images/potion.png";
import ModalComponent from "./LabModal";
import LabResults from "./LabResults";
import LabInfo from "./LabInfo";

const LaboratoryCard = () => {
  const [qrURL, setQrUrl] = useState("");
  const [credentialIssued, setCredentialIssued] = useState(false);
  const [credential, setCredentialId] = useState("");

  return (
    <div className="md:w-12/12">
      <section className='container w-full bg-green-100 p-8 my-5 m-w-90 rounded-lg shadow-lg sm:mx-auto place-items-center'>
        <h1 className='text-2xl mb-4 font-semibold text-green-800 flex items-center place-items-center'>
          <Image className=" swing" src={Potion} height={60} width={60} sizes="100%" alt="Potion" priority />
          Laboratory
        </h1>

        {!qrURL ? (
          <LabInfo />
        ) : (
          <LabResults credential={credential} />
        )}
        <ModalComponent
          buttonText="REQUEST LAB RESULTS"
          credentialIssued={credentialIssued}
          setCredentialId={setCredentialId}
          setCredentialIssued={setCredentialIssued}
          setQrUrl={setQrUrl}
        />

      </section>
    </div>
  );
};

export default LaboratoryCard;