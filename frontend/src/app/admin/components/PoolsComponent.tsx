// pages/credentials.tsx
"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../utils/db/supabaseClient";
import { Pool } from "../../../../types";

const PoolComponent: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      console.log("Fetching pools from the database...");

      const { data, error } = await supabase.from("pool_view").select("*");
      const jsonData = JSON.stringify(data, null, 2);
      console.log(`pools_view: ${jsonData}`);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPools(data || []);
      }

      setLoading(false);
    };

    fetchPools();
  }, []);

  if (isLoading) return <p>Loading pools...</p>;
  if (pools.length === 0) return <p>No pools available.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Pool Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100">
              {["Pool ID", "Heading", "Created At", "Start Date", "End Date", "Funding Amount", "Contributions", "Proof Template"].map((header) => (
                <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pools.map((pool) => (
              <tr key={pool.pool_id} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.pool_id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.pool_heading}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.created_at}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.start_date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.end_date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {`${pool.funding_amount} ${pool.currency_unit}`}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.contributions_amount}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {pool.proof_template}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoolComponent;