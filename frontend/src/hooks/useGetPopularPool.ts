"use client";

import { useEffect, useState } from "react";

import { getContributionsPerPool } from "../actions/contributions-action";
import { Contribution as ImportedContribution } from "../../types";

interface Contribution extends Omit<ImportedContribution, "issuer_id"> {
  issuer_id: string;
}

interface Pool {
  proof_template: string;
  contributions: Contribution[];
}

const useMostPopularPool = () => {
  const [mostPopularPool, setMostPopularPool] = useState<Pool | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setIsLoading(true);
      try {
        const poolsWithContributions = await getContributionsPerPool();

        let maxContributions = 0;
        let mostPopular: Pool | null = null;

        Object.keys(poolsWithContributions).forEach(poolKey => {
          // Map contributions to ensure issuer_id is always a string
          // @ts-expect-error, ts(2322)
          const contributions: Contribution[] = poolsWithContributions[poolKey].map(contribution => ({
            ...contribution,
            issuer_id: contribution.issuer_id || "default"
          }));

          if (contributions.length > maxContributions) {
            maxContributions = contributions.length;
            mostPopular = { proof_template: poolKey, contributions };
          }
        });

        setMostPopularPool(mostPopular);
      } catch (error) {
        console.error("Error fetching pools:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndProcessData();
  }, []);

  return { mostPopularPool, isLoading };
};

export default useMostPopularPool;
