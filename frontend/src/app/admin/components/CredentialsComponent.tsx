// pages/credentials.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/db/supabaseClient";
import { Contribution } from "../../../../types";
import { truncateString } from "../../../utils/tools";

const CredentialsComponent: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchContributions = async () => {
      const { data, error } = await supabase.from("contributions").select("*");

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setContributions(data || []);
    };

    fetchContributions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Credentials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-fit leading-normal">
          <thead>
            <tr className="bg-gray-100">
              {["Credential ID", "Contributor ID", "Test Name", "Issuer ID", "Issuer Name", "Issuer Logo", "Cholesterol Value", "Cholesterol Unit", "Cholesterol Reference Range", "Pool ID"].map((header) => (
                <th key={header} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.credential_id} className="hover:bg-gray-50">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.credential_id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {truncateString(contribution.contributor_id)}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.test_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {truncateString(contribution.issuer_id)}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.issuer_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  <Image src={contribution.issuer_logo} width={50} height={50} alt="Issuer Logo" priority className="rounded-full" />
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.cholesterol_value}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.cholesterol_unit}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.cholesterol_reference_range}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
                  {contribution.pool_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CredentialsComponent;
