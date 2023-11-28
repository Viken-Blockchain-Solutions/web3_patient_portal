import { supabase } from "../supabaseClient";

export async function getContributionsByPool(poolId: string): Promise<string> {
  const { data, error } = await supabase
    .from("pool_view")
    .select("contributions_amount")
    .eq("pool_id", poolId)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return "Error";
  }

  return data ? data.contributions_amount : "No data found";
}

