// admin/components/PoolsComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../utils/db/supabaseClient";
import { Pool } from "../../../../types";
import { uuid as v4 } from "uuidv4";
import PoolForm from "./PoolForm";
import PoolTable from "./PoolTable";

const PoolComponent: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [newPool, setNewPool] = useState({
    pool_id: `${v4()}`,
    pool_heading: "",
    pool_description: "",
    start_date: "",
    end_date: "",
    funding_amount: 0,
    currency_unit: "",
    contributions_amount: 0,
    proof_template: ""
  });

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      console.log("Fetching pools from the database...");

      const { data, error } = await supabase.from("research_pools").select("*");

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPools(data || []);
      }

      setLoading(false);
    };

    fetchPools();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewPool({ ...newPool, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    const { data, error } = await supabase.from("research_pools").insert([newPool]);
    if (error) {
      console.error("Error inserting new pool:", error);
    } else {
      if (data !== null) {
        setPools([...pools, data[0]]);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      }
    }
  };

  if (isLoading) return <p>Loading pools...</p>;
  if (pools.length === 0) return <p>No pools available.</p>;

  return (
    <div className="flex flex-col mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Pool Data</h1>
      {isSuccess && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">Success</p>
          <p>New pool added successfully!</p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <PoolForm
          newPool={newPool}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <PoolTable pools={pools} />
      </div>
    </div>
  );
};

export default PoolComponent;