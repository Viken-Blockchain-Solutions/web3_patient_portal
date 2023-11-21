import { useState, useEffect } from "react";
import { supabase } from "../utils/db/supabaseClient";
import { Pool } from "../../types";

export const useFetchPools = () => {

  const [researchPools, setResearchPools] = useState<Pool[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("pool_view").select("*");
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