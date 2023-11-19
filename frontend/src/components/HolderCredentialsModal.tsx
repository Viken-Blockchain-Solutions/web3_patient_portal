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
    <div className="ta-c">
      <button onClick={toggleModal} className="btn-secondary mt-2">
        View Holder´s Credentials
      </button>

      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        <h2 className="text-lg font-bold">Holder´s Credentials</h2>
        <div className="mt-4 text-sm text-gray-600">
          {holderCredentials.map((credential, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">Credential - {index + 1}</h3>

              <h4 className="text-lg text-main">Issuer:</h4>
              <p className="mb-2 p-2 bg-slate-100 rounded-lg">
                <span className="font-bold">Did:</span>
                <span className="text-xs"> {credential.issuer.id}</span>
                <br />
                <span className="font-bold">Name:</span> {credential.issuer.name}
              </p>
              <h4 className="text-lg text-main mb-2">Credential Subject:</h4>
              <p className="mb-2 p-2 bg-slate-100 rounded-lg">
                <span className="font-bold">Did:</span>
                <span className="text-xs"> {credential.credentialSubject.id}</span>
                <br />
                <span className="font-bold ">Test Name : </span>{credential.credentialSubject.testName}
              </p>

              <p className="mb-2 p-2 bg-slate-100 rounded-lg">
                <span className="text-gray-500 font-semibold text-lg mb-4">Results</span>:

                <table className="my-table w-full bg-slate-200 rounded-lg">
                  <tr>
                    <td className="p-2 font-bold">Unit</td>
                    <td>{credential.credentialSubject.results.totalCholesterol.unit}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Value</td>
                    <td>{credential.credentialSubject.results.totalCholesterol.value}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">Reference range</td>
                    <td>{credential.credentialSubject.results.totalCholesterol.referenceRange}</td>
                  </tr>
                </table>
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HolderCredentialsModal;
