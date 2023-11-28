"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { truncateString } from "../utils/tools";
import { BloodTestCredential, CholesterolCredential, DiabetesMonitoringCredential } from "../../types";


interface HolderCredentialsModalProps {
  holderCredentials: (BloodTestCredential | CholesterolCredential | DiabetesMonitoringCredential)[];
}

const HolderCredentialsModal: React.FC<HolderCredentialsModalProps> = ({ holderCredentials }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderCredentialResults = (credential: BloodTestCredential | CholesterolCredential | DiabetesMonitoringCredential) => {
    const { testName } = credential.credentialSubject;

    if (credential.kind === "BloodTestCredential") {
      const { hemoglobin } = credential.credentialSubject.results;
      return (
        <div>
          <h4 className="text-lg text-main mb-2">{testName} Results:</h4>
          <table className="my-table w-full bg-slate-200 rounded-lg">
            <tr>
              <td className="p-2 font-bold">Hemoglobin Unit</td>
              <td>{hemoglobin.unit}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Hemoglobin Value</td>
              <td>{hemoglobin.value}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Hemoglobin Reference Range</td>
              <td>{hemoglobin.referenceRange}</td>
            </tr>
          </table>
        </div>
      );
    } else if (credential.kind === "CholesterolCredential") {
      const { totalCholesterol } = credential.credentialSubject.results;
      return (
        <div>
          <h4 className="text-lg text-main mb-2">{testName} Results:</h4>
          <table className="my-table w-full bg-slate-200 rounded-lg">
            <tr>
              <td className="p-2 font-bold">Cholesterol Unit</td>
              <td>{totalCholesterol.unit}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Cholesterol Value</td>
              <td>{totalCholesterol.value}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Cholesterol Reference Range</td>
              <td>{totalCholesterol.referenceRange}</td>
            </tr>
          </table>
        </div>
      );
    } else if (credential.kind === "DiabetesMonitoringCredential") {
      const { glucoseLevel } = credential.credentialSubject.results;
      return (
        <div>
          <h4 className="text-lg text-main mb-2">{testName} Results:</h4>
          <table className="my-table w-full bg-slate-200 rounded-lg">
            {/* Render Diabetes Monitoring Test specific table rows */}
            <tr>
              <td className="p-2 font-bold">Glucose Level Unit</td>
              <td>{glucoseLevel.unit}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Glucose Level Value</td>
              <td>{glucoseLevel.value}</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Glucose Level Reference Range</td>
              <td>{glucoseLevel.referenceRange}</td>
            </tr>
            {/* Add more Diabetes Monitoring Test specific rows if needed */}
          </table>
        </div>
      );
    } else {
      // Handle other credential types here if necessary
      return null;
    }
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
                <span className="text-xs"> {truncateString(credential.issuer.id)}</span>
                <br />
                <span className="font-bold">Name:</span> {credential.issuer.name}
              </p>
              <h4 className="text-lg text-main mb-2">Credential Subject:</h4>
              <p className="mb-2 p-2 bg-slate-100 rounded-lg">
                <span className="font-bold">Did:</span>
                <span className="text-xs"> {truncateString(credential.credentialSubject.id)}</span>
                <br />
                <span className="font-bold ">Test Name : </span>{credential.credentialSubject.testName}
              </p>
              {renderCredentialResults(credential)}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default HolderCredentialsModal;
