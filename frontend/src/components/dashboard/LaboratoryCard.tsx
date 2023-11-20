"use client";
import { useState } from "react";
import Image from "next/image";
import Potion from "../../public/assets/images/potion.png";
import ModalComponent from "../ModalComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight, faWarning, faWheatAwnCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const LaboratoryCard = () => {
  const [qrURL, setQrUrl] = useState("");
  const [error, setError] = useState("");
  const [credentialIssued, setCredentialIssued] = useState(false);
  const [credential, setCredentialId] = useState("");

  return (
    <div className="md:w-12/12">
      <section className='container w-full bg-green-100 p-8 my-5 m-w-90 rounded-lg shadow-lg sm:mx-auto place-items-center'>
        <h1 className='text-2xl mb-4 font-semibold text-green-800 flex items-center place-items-center'>
          <Image className=" swing" src={Potion} height={60} width={60} sizes="100%" alt="Potion" priority />
          Laboratory</h1>
        {!qrURL ? (
          <div>
            <h2 className='text-md mb-3 font-semibold text-green-500'>For Patients</h2>
            <p className='text-md mb-3'>
              In a real-life scenario, a Verifiable Credential from a laboratory test is issued by an accredited laboratory.
              <br />
              For testing purposes, we simulate the role of a laboratory to issue this test Verifiable Credential (VC).
            </p>
            <p className='text-md mb-3'>
              Your data is encrypted and secure, and you have full control over who can access it.
              Contribute to the future of medicine while earning from it.
            </p>
            <p className="bg-green-300 rounded-lg p-3">
              <FontAwesomeIcon icon={faWarning} className="mr-2" />
              If you already have this credential into your dock wallet app, you can go to research pools to contribute.
            </p>
          </div>
        ) : (
          <div className="p-4 mt-4 rounded-md justify-center items-center bg-green-100">
            <div className="p-4 mt-4 rounded-md justify-center items-center bg-green-100">
              <table className="min-w-full divide-y divide-gray-200 rounded-md">
                <thead className="bg-green-50">
                  <tr>
                    <th colSpan={2} className="px-6 py-4 text-left text-sm font-semibold text-green-800">
                      <p className="text-md leading-6 pb-1">
                        Follow the link below to view your lab results.
                      </p>
                      <p className="text-md leading-6 pb-1">
                        Scan the QR code on the page to import the <span className="text-green-800 underline font-semibold">Verifiable Credential</span>
                        into your <span className="text-green-800 underline font-semibold">DOCK WALLET</span>.
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Lab Results PDF Link
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link href={credential} target="_blank" rel="noopener noreferrer" className="text-green-800 underline font-semibold">
                        <FontAwesomeIcon icon={faHandPointRight} /> Access Lab Results
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      PDF Password
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1234
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        )}
        <ModalComponent
          buttonText="REQUEST LAB RESULTS"
          error={error}
          credentialIssued={credentialIssued}
          setCredentialId={setCredentialId}
          setCredentialIssued={setCredentialIssued}
          setError={setError}
          setQrUrl={setQrUrl}
        />

      </section>
    </div>
  );
};

export default LaboratoryCard;