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
  const [holderCredentials, setHolderCredentials] = useState<any>(null);
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
    if (isProofVerified && holderCredentials) {
      const contributionData: Contribution = {
        credential_id: holderCredentials.credential_id,
        contributor_id: holderCredentials.contributor_id,
        test_name: holderCredentials.test_name,
        issuer_id: holderCredentials.issuer_id,
        issuer_name: holderCredentials.issuer_name,
        issuer_logo: holderCredentials.issuer_logo,
        cholesterol_value: holderCredentials.cholesterol_value,
        cholesterol_unit: holderCredentials.cholesterol_unit,
        cholesterol_reference_range: holderCredentials.cholesterol_reference_range
      };

      try {
        await handleContribution(contributionData);
        setContributionStatus("Success: Your contribution has been added.");
      } catch (error) {
        if (error instanceof Error) {
          setContributionStatus(`Error: ${error.message}`);
        } else {
          setContributionStatus("Error: An unknown error occurred");
        }
      }
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
        {holderCredentials && <HolderCredentialsModal holderCredentials={holderCredentials} />}
      </div>
    </div>
  );
}
