import { supabase } from "./supabaseClient";
import { Contribution } from "../../../types";
import { toast } from "react-toastify";

export const addContribution = async (contribution: Contribution, setAlreadyContributed: (bool: boolean) => void) => {

  const existingContributions: any = await getContributionByCredentialID(contribution.contributor_id, contribution.credential_id);

  if (existingContributions.length > 0) {
    setAlreadyContributed(true)
    toast.info('You already contributed to this pool.')
    return false;
  }

  try {
    const { data, error }: any = await supabase
      .from("contributions")
      .insert([contribution]);
    if (error) throw new Error(error.message);

    console.log('addContribution data', data);
    if (data && data.pool_id) {
      return data;
    } else {
      return false;
    }
  } catch (error) {
    toast.info('Contribution error, try again or contact support')
    return null
  }

};

export const updateContribution = async (credential_id: string, updates: Partial<Contribution>) => {
  const { data, error } = await supabase
    .from("contributions")
    .update(updates)
    .match({ credential_id });
  if (error) throw new Error(error.message);
  return data;
};

export const getContributionByCredentialID = async (contributor_id: string, credential_id: string) => {
  const { data, error } = await supabase
    .from("contributions")
    .select("*")
    .eq("contributor_id", contributor_id)
    .eq("credential_id", credential_id);
  if (error) throw new Error(error.message);
  return data;
};