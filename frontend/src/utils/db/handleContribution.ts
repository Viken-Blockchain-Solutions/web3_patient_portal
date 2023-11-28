// //TODO - DELETE THIS FILE
// import { Contribution } from "../../../types";
// import { addContribution, getContributionByCredentialID } from "./contributions";
// import { toast } from "react-toastify"
// // import { incrementContributions } from "./pools/addDataByPool";

// export const handleContribution = async (contribution: Contribution, setAlreadyContributed: (bool: boolean) => void) => {
//   const existingContributions: any = await getContributionByCredentialID(contribution.contributor_id, contribution.credential_id,);
//   if (existingContributions.length > 0) {
//     setAlreadyContributed(true)
//     toast.info('You already contributed to this pool.')
//     return
//   }
//   const addedContribution: any = await addContribution(contribution);
//   console.log('addedContribution', addedContribution);
//   // await incrementContributions(addedContribution.pool_id);
//   return addedContribution;
// };

