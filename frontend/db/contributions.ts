// frontend/db/contributions.ts
import { supabase } from "./supabaseClient";
import { Contribution } from "../types";
import { toast } from "react-toastify";

export const addContribution = async (contribution: Contribution, setAlreadyContributed: (bool: boolean) => void) => {

  const existingContributions: any = await getContributionByCredentialID(contribution.contributor_did, contribution.credential_id);

  if (existingContributions.length > 0) {
    setAlreadyContributed(true);
    toast.info("You already contributed to this pool.");
    return false;
  }

  try {
    const { data, error }: any = await supabase
      .from("new_contributions")
      .insert([contribution]);
    if (error) throw new Error(error.message);
    console.log(data);
    console.log("addContribution data", contribution);
    return true;
  } catch (error) {
    toast.info("Contribution error, try again or contact support");
    return null;
  }

};

export const updateContribution = async (credential_id: string, updates: Partial<Contribution>) => {
  const { data, error } = await supabase
    .from("new_contributions")
    .update(updates)
    .match({ credential_id });
  if (error) throw new Error(error.message);
  return data;
};

export const getContributionByCredentialID = async (contributor_did: string, credential_id: string) => {
  const { data, error } = await supabase
    .from("new_contributions")
    .select("*")
    .eq("contributor_did", contributor_did)
    .eq("credential_id", credential_id);
  if (error) throw new Error(error.message);
  return data;
};