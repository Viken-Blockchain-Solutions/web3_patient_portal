"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Docs from "../public/assets/images/docs.png";
import HolderCredentialsModal from "./HolderCredentialsModal";
import { ProofTemplateVerification } from "./ProofTemplateVerification";
import { Contribution } from "../../types";
import { handleContribution } from "../utils/db/handleContribution";
import { incrementContributions } from "../utils/db/pools/addDataByPool";

interface PoolCardProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({ title, startDate, endDate, funding, content }: PoolCardProps) {
  const [isContributeClicked, setIsContributeClicked] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);
  // eslint-disable-next-line
  const [contributionStatus, setContributionStatus] = useState<string>(""); 

  const handleContributeClick = () => {
    setIsContributeClicked(true);
  };

  useEffect(() => {
    if (isProofVerified) {
      onUserContribution();
    }

  });

  const onUserContribution = async () => {

    if (isProofVerified && holderCredentials && holderCredentials.length > 0) {
      let contributionProcessed = false; // Flag to check if at least one contribution is processed
      setContributionStatus("Processing contributions...");
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
          cholesterol_reference_range: credential.credentialSubject.results.totalCholesterol.referenceRange,
          pool_id: "e93cc9c8-22c6-412b-bba8-6e4f57de72f8"
        };

        console.log("Contribution Data:", contributionData);

        try {
          setContributionStatus(`Checking if contribution has already been made for credential ID: ${credential.id}`);
          const newContribution = await handleContribution(contributionData);
          if (newContribution) {
            setContributionStatus(`Success: Contribution has been added for credential ID: ${credential.id}`);

            await incrementContributions(newContribution.pool_id);
            contributionProcessed = true;
          }
        } catch (error) {
          if (error instanceof Error && error.message === "This contribution has already been made.") {
            console.error("Contribution Error:", error.message);
            setContributionStatus(error.message);
            break;
          } else {
            console.error("An error was encountered:", error);
          }
        }
      }

      if (!contributionProcessed) {
        // setIsContributeClicked(false);
        // setIsProofVerified(null);
        // setContributionStatus("");
        console.log("an error with the a contribution was encountered.");
      } else {
        setContributionStatus("All contributions processed.");
      }
    }
  };

  return (
    <>
      <div className="p-4 rounded-lg  bg-slate-100 w-full relative pt-2">

        <div className="flex pt-2">
          <div className="flex flex-col">
            <p className="text-lg inline-flex place-items-center">
              <Image
                alt="avatar"
                width={40}
                height={40}
                sizes="100%"
                className="verifyLogo"
                src={Docs}
                priority
              />
              {title}</p>
          </div>
        </div>
        <hr className="divider" />
        <p>
          About:
        </p>
        <p className="text-gray-600">
          {content}
        </p>

        <div className="my-4">
          <p className="text-main font-bold">Reward: ${funding}</p>
        </div>

        <div>
          <button className="btn-primary w-full" onClick={handleContributeClick}>
            Contribute
          </button>

          {isContributeClicked && (
            <ProofTemplateVerification
              setHolderCredentials={setHolderCredentials}
              setIsProofVerified={setIsProofVerified}
            />
          )}
          {/* Optionally, display the holder's credentials and verification status */}
          {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
          {/*holderCredentials && <div>Holder´s Credentials: {JSON.stringify(holderCredentials)}</div>*/}
          {holderCredentials && <HolderCredentialsModal holderCredentials={holderCredentials} />}
        </div>
      </div>

      <div className="inline-flex gap-2 rounded-lg  bg-slate-100 w-full p-3 mt-5">
        <p className="font-bold text-gray-500">Start Date: {startDate} </p>
        <p className="font-bold text-gray-500">- End Date: {endDate}</p>
      </div>

      <div className="mt-5">
        {isProofVerified !== null && <div>Proof Verification Status: {isProofVerified ? "Verified" : "Not Verified"}</div>}
        {isProofVerified && <HolderCredentialsModal holderCredentials={holderCredentials} />}
      </div>
    </>
  );
}
