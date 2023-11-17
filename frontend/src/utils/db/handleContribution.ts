import { Contribution } from "../../../types";
import { addContribution, getContributionByCredentialID } from "./contributions";

export const handleContribution = async (contribution: Contribution) => {
  const existingContributions = await getContributionByCredentialID(contribution.contributor_id, contribution.credential_id,);
  if (existingContributions.length > 0) {
    console.log("This contribution has already been made.");
    throw new Error("This contribution has already been made.");
  }
  console.log("from handleContribution:", handleContribution);
  const addedContribution = await addContribution(contribution);
  return addedContribution;
};
