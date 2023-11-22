/* import { useState, useEffect } from "react";
import { Contribution } from "../../types";
import { addContribution } from "../../db/contributions";
import { toast } from "react-toastify";

interface AddContributionToDBProps {
  poolId: string;
  holderCredentials: any;
  setContributionProcessed: (bool: boolean) => void;
  setAlreadyContributed: (bool: boolean) => void;
  isProofVerified: boolean;
  setIsProofVerified: (bool: boolean) => void;
}

export const useAddContributionToDB = ({poolId, holderCredentials, setAlreadyContributed, isProofVerified, setIsProofVerified}: AddContributionToDBProps) => {

  const onUserContribution = async () => {

    for (const credential of holderCredentials) {

      const contributionData: Contribution = {
        credential_id: credential.id as string,
        contributor_did: credential.credentialSubject.id as string,
        test_name: credential.credentialSubject.testName,
        issuer_id: credential.issuer.id,
        issuer_name: credential.issuer.name,
        issuer_logo: credential.issuer.logo,
        test_result: credential.credentialSubject.results,
        pool_id: poolId,
        verified_status: isProofVerified
      };

      try {
        const newContribution = await addContribution(contributionData, setAlreadyContributed);
        if (newContribution) {
          toast.success("Contribution successfull!");
          return true;
        }
      } catch (error) {
        console.error("An error was encountered:", error);
        toast.error("An error was encountered, try again or contact support");
      }
    }
  }


return {
  contributionSuccess: onUserContribution
}; */