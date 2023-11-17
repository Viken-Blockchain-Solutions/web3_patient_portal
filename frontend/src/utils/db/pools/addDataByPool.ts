import { supabase } from "../supabaseClient";

export async function incrementContributions(poolId: string): Promise<number | null> {
  // Fetch the current contributions_amount
  const { data, error: fetchError } = await supabase
    .from("pool_view")
    .select("contributions_amount")
    .eq("pool_id", poolId)
    .single();

  if (fetchError || !data) {
    console.error("Error fetching data:", fetchError);
    return null;
  }

  const newAmount: number = data.contributions_amount + 1;

  // Update the contributions_amount
  const { error: updateError } = await supabase
    .from("pool_view")
    .update({ contributions_amount: newAmount })
    .eq("pool_id", poolId);

  if (updateError) {
    console.error("Error updating data:", updateError);
    return null;
  }

  return newAmount;
}