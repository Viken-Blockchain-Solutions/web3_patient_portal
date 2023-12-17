import { supabase } from "../../db/supabaseClient";

export const getPoolsAction = async () => {
  const { data, error } = await supabase.from("research_pools").select("*");
  if (error) {
    console.error("Error fetching data:", error);
  }
  return data;
};

export const getPoolsTotalFundingAction = async () => {
  const { data, error } = await supabase.from("research_pools").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return 0;
  }

  const totalFunding = data.reduce((total, pool) => {
    return total + (pool.funding_amount * 1000 || 0);
  }, 0);

  return totalFunding;
};