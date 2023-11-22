// frontend/src/db/contributors.ts
import { supabase } from "./supabaseClient";
import { Contributor } from "../../types";

/**
 * Adds a contributor to the database if they don't already exist.
 *
 * @param {Contributor} contributor - The contributor to be added.
 * @return {Promise<boolean>} - Returns a boolean indicating whether the contributor was successfully added.
 */
export const addContributorIfNotExists = async (contributor: Contributor): Promise<boolean> => {

  try {
    // Check if the contributor already exists
    const { data, error: fetchError } = await supabase
      .from("contributors")
      .select("contributor_did")
      .eq("contributor_did", contributor.contributor_did)
      .single();

    if (fetchError && fetchError.message !== "No rows found") {
      throw fetchError;
    }
    console.log(data);
    if (!data) {
      const { error: insertError } = await supabase
        .from("contributors")
        .insert([{ contributor_did: contributor.contributor_did }]);

      if (insertError) {
        console.error(`Error inserting contributor: ${insertError.message}`);
        throw insertError;
      }

      console.log("Contributor added:", contributor.contributor_did);
      return true;
    } else {
      console.log("Contributor already exists:", contributor.contributor_did);
      return false;
    }
  } catch (error) {
    console.error(`Error adding contributor: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    return false;
  }
};
