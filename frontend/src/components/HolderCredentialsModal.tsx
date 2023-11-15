"use client";
import React, { useState } from "react";
import Modal from "./Modal"; // Ensure this path is correct

interface Credential {
  id: string;
  name: string;
  type: string[];
  issuer: {
    id: string;
    logo: string;
    name: string;
  };
  "@context": Array<string | Record<string, string>>;
  description: string;
  issuanceDate: string;
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
      <button onClick={toggleModal} className="bg-blue-400 text-white px-4 py-2 rounded">
        View Holder´s Credentials
      </button>

      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <h2 className="text-lg font-bold">Holder´s Credentials</h2>
        <pre className="mt-4 text-sm text-gray-600">{JSON.stringify(holderCredentials, null, 2)}</pre>
      </Modal>
    </>
  );
};

export default HolderCredentialsModal;
