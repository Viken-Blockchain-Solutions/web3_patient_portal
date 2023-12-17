import { supabase } from "../../db/supabaseClient";

interface Contribution {
  contribution_id: number;
  contributor_did: string;
  proof_template: string;
  credential_id: string;
  test_name: string;
  issuer_id: string | null;
  issuer_name: string | null;
  issuer_logo: string | null;
  test_result: any; // Specify a more precise type if possible
  submitted_at: string;
  verified_status: boolean;
  pool_id: string | null;
}

export const getContributionsPerPool = async (): Promise<Record<string, Contribution[]>> => {
  const { data, error } = await supabase.from("new_contributions").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return {};
  }

  const poolsWithContributions: Record<string, Contribution[]> = {};

  data.forEach((contribution: Contribution) => {
    const poolKey = contribution.proof_template;

    if (!poolsWithContributions[poolKey]) {
      poolsWithContributions[poolKey] = [];
    }

    poolsWithContributions[poolKey].push(contribution);
  });

  Object.keys(poolsWithContributions).forEach(poolKey => {
    poolsWithContributions[poolKey].sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());
  });

  return poolsWithContributions;
};