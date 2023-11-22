import { useState, useEffect } from "react";
import { Contribution } from "../../types";
import { addContribution } from "../../db/contributions";
import { toast } from "react-toastify";

export const useContribute = () => {

  const [contributionProcessed, setContributionProcessed] = useState(false);
  const [alreadyContributed, setAlreadyContributed] = useState(false);
  const [holderCredentials, setHolderCredentials] = useState<any>([]);
  const [isProofVerified, setIsProofVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (isProofVerified) {
      onUserContribution();
    }
    // eslint-disable-next-line
    }, [isProofVerified]);

  const onUserContribution = async () => {

    if (isProofVerified && holderCredentials && holderCredentials.length > 0) {
      let processed = false;
      for (const credential of holderCredentials) {

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

        try {
          const newContribution = await addContribution(contributionData, setAlreadyContributed);
          if (newContribution) {
            processed = true;
            setContributionProcessed(processed);
            toast.success("Contribution successfull!");
          }
        } catch (error) {
          console.error("An error was encountered:", error);
          toast.error("An error was encountered, try agina or contact support");
        }
      }
    }
  };

  return {
    contributionProcessed,
    alreadyContributed,
    holderCredentials,
    isProofVerified,
    setHolderCredentials,
    setIsProofVerified
  };

};