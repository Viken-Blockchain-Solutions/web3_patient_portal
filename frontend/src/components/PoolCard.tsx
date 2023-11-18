"use client";
import React, { useState } from "react";
import Image from "next/image";
import Docs from "../public/assets/images/docs.png";
import PoolModal from "./pools/PoolModal";

interface PoolCardProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  funding: number;
}

export default function PoolCard({ title, startDate, endDate, funding, content }: PoolCardProps) {

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
          await handleContribution(contributionData);
          setContributionStatus(`Success: Contribution has been added for credential ID: ${credential.id}`);
          contributionProcessed = true;
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
        setIsContributeClicked(false);
        setIsProofVerified(null);
        setContributionStatus("");
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

        <PoolModal />
      </div>

      <div className="inline-flex gap-2 rounded-lg  bg-slate-100 w-full p-3 mt-5">
        <p className="font-bold text-gray-500">Start Date: {startDate} </p>
        <p className="font-bold text-gray-500">- End Date: {endDate}</p>
      </div>


    </>
  );
}
