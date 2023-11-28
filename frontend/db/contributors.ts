// frontend/db/contributors.ts
import { supabase } from "./supabaseClient";

export const checkContributorExists = async (contributorDid: string): Promise<boolean> => {
  const { data: existingContributors, error } = await supabase
    .from("contributors")
    .select("*")
    .eq("contributor_did", contributorDid.split("did:key:")[1]);

  if (error) {
    console.log("user already exists:", error);
    return false;
  }
  console.log(existingContributors);
  return existingContributors.length > 0;
};

export const handleAddContributor = async (_userDid: string) => {
  const keyPart = _userDid.split("did:key:")[1];
  const exists = await checkContributorExists(keyPart);
  if (!exists) {
    const { data: newContributor, error } = await supabase
      .from("contributors")
      .insert([{ contributor_did: keyPart }]);

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    console.log(`New contributor added: ${newContributor}`,);

    return {
      success: true
    };
  }
};