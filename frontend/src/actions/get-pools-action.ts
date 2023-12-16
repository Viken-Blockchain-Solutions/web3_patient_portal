import { supabase } from "../../db/supabaseClient";

export const getPoolsAction = async () => {
  const { data, error } = await supabase.from("research_pools").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  }
  return data;
};