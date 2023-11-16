// utils/db/contributions.ts
import { supabase } from "./supabaseClient";
import { Contribution } from "../../../types";

export const addContribution = async (contribution: Contribution) => {
  const { data, error } = await supabase
    .from("contributions")
    .insert([contribution]);

  if (error) throw new Error(error.message);
  return data;
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