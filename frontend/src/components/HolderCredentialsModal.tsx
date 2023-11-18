"use client";
import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this path is correct

interface Credential {
  issuer: {
    id: string;
    logo: string;
    name: string;
  };
  credentialSubject: {
    id: string;
    testName: string;
    results: {
      [key: string]: {
        unit: string;
        value: string;
        referenceRange: string;
      };
    };
  };
}

interface HolderCredentialsModalProps {
  holderCredentials: Credential[];
}

const HolderCredentialsModal: React.FC<HolderCredentialsModalProps> = ({ holderCredentials }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal-trigger mt-5">
        View Holder´s Credentials
      </button>

      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <h2 className="text-lg font-bold">Holder´s Credentials</h2>
        <div className="mt-4 text-sm text-gray-600">
          {holderCredentials.map((credential, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-semibold">Credential {index + 1}</h3>
              <h4 className="text-md">Issuer:</h4>
              <pre>{JSON.stringify(credential.issuer, null, 2)}</pre>
              <h4 className="text-md">Credential Subject:</h4>
              <pre>{JSON.stringify(credential.credentialSubject, null, 2)}</pre>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default HolderCredentialsModal;
