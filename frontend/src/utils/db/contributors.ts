import { supabase } from "./../db/supabaseClient";

export async function checkAndAddContributor(contributor_id: string) {
  // Check if contributor_id exists in the contributors table
  const { data, error } = await supabase
    .from("contributors")
    .select("*")
    .eq("contributor_id", contributor_id)
    .single();

  if (error && error.code !== "PGRST100") {
    console.error("Error fetching contributor:", error);
    return;
  }

  if (!data) {
    const { error: insertError } = await supabase
      .from("contributors")
      .insert([{ contributor_id }])
      .single();

    if (insertError) {
      console.error("Error adding contributor:", insertError);
    } else {
      console.log("Contributor added successfully");
    }
  } else {
    console.log("Contributor already exists");
  }
}