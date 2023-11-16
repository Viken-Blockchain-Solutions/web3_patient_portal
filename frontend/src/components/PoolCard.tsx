"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatarLogo from "../public/assets/images/verifyed.png";
import HolderCredentialsModal from "./HolderCredentialsModal";
import { ProofTemplateVerification } from "./ProofTemplateVerification";
import { Contribution } from "../../types";
import { handleContribution } from "../utils/db/handleContribution";

interface PoolCardProps {
  title: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({ title, startDate, endDate, funding }: PoolCardProps) {
  const [isContributeClicked, setIsContributeClicked] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);
  const [contributionStatus, setContributionStatus] = useState<string>("");

  const handleContributeClick = () => {
    setIsContributeClicked(true);
  };

  useEffect(() => {
    if (isProofVerified) {
      onUserContribution();
    }
  }, [isProofVerified, holderCredentials]);

  const onUserContribution = async () => {
    console.log("Starting OnUserContribution!");
    if (isProofVerified && holderCredentials && holderCredentials.length > 0) {
      console.log("isProofVerified and holderCredentials are true!");

      for (const credential of holderCredentials) {
        console.log(`Handling Credential with ID: ${credential.id}`);
        const contributionData: Contribution = {
          credential_id: credential.id as string,
          contributor_id: credential.credentialSubject.id as string,
          test_name: credential.credentialSubject.testName,
          issuer_id: credential.issuer.id,
          issuer_name: credential.issuer.name,
          issuer_logo: credential.issuer.logo,
          cholesterol_value: credential.credentialSubject.results.totalCholesterol.value,
          cholesterol_unit: credential.credentialSubject.results.totalCholesterol.unit,
          cholesterol_reference_range: credential.credentialSubject.results.totalCholesterol.referenceRange
        };

        console.log("Contribution Data:", contributionData);

        try {
          console.log("Adding Contribution to DB...");
          await handleContribution(contributionData);
          console.log("Success: Contribution has been added for credential ID:", credential.id);
        } catch (error) {
          console.error("An error was encountered while adding your contribution for credential ID:", credential.id, error);
          if (error instanceof Error) {
            console.error("Error message:", error.message);
          }
        }
      }

      // Update status after all contributions have been processed
      setContributionStatus("All contributions processed.");
    }
  };

  return (
    <div className="max-w-[400px]">
      <div className="flex gap-3 place-items-center">
        <Image
          alt="avatar"
          width={50}
          height={50}
          className="verifyLogo"
          src={avatarLogo}
          priority
        />
        <div className="flex flex-col">
          <p className="text-lg">{title}</p>
        </div>
      </div>
      <hr className="divider" />
      <p className="text-small text-default-500">Start Date: {startDate}</p>
      <p className="text-small text-default-500">End Date: {endDate}</p>
      <div className="my-4">
        <p>Funding: ${funding}</p>
      </div>
      {contributionStatus && <div className="text-green-500 text-lg">{contributionStatus}</div>}
      <div>
        <button className="btn-primary" onClick={handleContributeClick}>
          Contribute
        </button>

        {isContributeClicked && (
          <ProofTemplateVerification
            setHolderCredentials={setHolderCredentials}
            setIsProofVerified={setIsProofVerified}
          />
        )}

        {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
        {isProofVerified && <HolderCredentialsModal holderCredentials={holderCredentials} />}
      </div>
    </div>
  );
}
