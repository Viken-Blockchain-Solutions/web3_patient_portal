import { Contribution } from "../../../types";
import { addContribution, getContributionByDate } from "./contributions";

export const handleContribution = async (contribution: Contribution) => {

  const existingContributions = await getContributionByDate(contribution.contributor_id, contribution.credential_id);
  if (existingContributions.length > 0) {
    throw new Error("This contribution has already been made.");
  }

  const addedContribution = await addContribution(contribution);
  return addedContribution;
};
