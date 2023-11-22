// frontend/src/hooks/useFetchPools.ts
"use client";
import { useState, useEffect } from "react";
import { supabase } from "../db/supabaseClient";
import { Pool } from "../../types";

/**
 * Fetches and returns research pools from the database.
 *
 * @return {{ researchPools: Pool[], isLoading: boolean }} An object containing the fetched research pools and a flag indicating if the data is still loading.
 */

export const useFetchPools = () => {

  const [researchPools, setResearchPools] = useState<Pool[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("research_pools").select("*");
      if (error) {
        console.error("Error fetching pools:", error);
      } else {
        setResearchPools(data || []);
      }
      setLoading(false);
    };
    fetchPools();
  }, []);

  return {
    researchPools,
    isLoading
  };
};