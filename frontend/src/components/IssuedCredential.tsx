import React from "react";
import Image from "next/image";
import {
  // Proof,
  // CredentialSubject,
  Credential
} from "../types/components";

interface VerifiedCredentialProps {
  credential: Credential;
}

// The VerifiedCredentialComponent functional component
const IssuedCredentialComponent: React.FC<VerifiedCredentialProps> = ({
  credential
}) => {
  return (
    <div className="max-w-fit mt-5 shadow-md" >
      <div className="p-5 border rounded shadow-md bg-white">

        <h2 className="text-lg font-bold">Verified Credential</h2>

        <div className="mt-2">
          <strong className="font-bold">ID:</strong> {credential.id}
        </div>
        <div className="mt-2">
          <strong className="font-bold">Type:</strong>{" "}
          {credential.type.join(", ")}
        </div>
        <div className="mt-2">
          <strong className="font-bold">Issuance Date:</strong>{" "}
          {credential.issuanceDate}
        </div>
        <div className="mt-2">
          <strong className="font-bold">Issuer:</strong>
          <div className="p-2">
            <div className="font-bold">
              Name:{" "}
              <span className="font-normal">{credential.issuer.name}</span>
            </div>
            <div className="font-bold">
              Logo:{" "}
              <Image
                src={credential.issuer.logo as string}
                width={75}
                height={75}
                alt="VBS Logo"
              />
            </div>
            <div className="font-bold">
              ID: <span>{credential.issuer.id}</span>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <strong className="font-bold">Credential Subject:</strong>
          <div className="bg-gray-300 p-2 mt-1 rounded">
            <pre className="p-2 mt-1">
              {JSON.stringify(credential.credentialSubject, null, 2)}
            </pre>
          </div>
        </div>
        <div className="mt-2">
          <strong className="font-bold">Proof:</strong>
          <pre className="bg-gray-100 p-2 mt-1 rounded">
            {JSON.stringify(credential.proof, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default IssuedCredentialComponent;
