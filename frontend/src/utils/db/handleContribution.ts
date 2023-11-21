import { Contribution } from "../../../types";
import { addContribution, getContributionByCredentialID } from "./contributions";
// import { incrementContributions } from "./pools/addDataByPool";

export const handleContribution = async (contribution: Contribution) => {
  const existingContributions: any = await getContributionByCredentialID(contribution.contributor_id, contribution.credential_id,);
  if (existingContributions.length > 0) {
    throw new Error("This contribution has already been made.");
  }
  const addedContribution: any = await addContribution(contribution);
  console.log('addedContribution', addedContribution);
  // await incrementContributions(addedContribution.pool_id);
  return addedContribution;
};
