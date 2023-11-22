// admin/components/CredentialsComponent.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../../../db/supabaseClient";
import { Contribution } from "../../../../types";
import { truncateString } from "../../../utils/tools";

const CredentialsComponent: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchContributions = async () => {
      const { data, error } = await supabase.from("new_contributions").select("*");
      console.log(data);
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setContributions(data || []);
    };

    fetchContributions();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contributions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contributions.length / itemsPerPage);
  const changePage = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-lg font-bold text-center mb-4">Credentials</h1>
      <div className="overflow-x-auto">
        {/* <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100">
            {["Credential ID", "Contributor ID", "Test Name", "Issuer ID", "Issuer Name", "Issuer Logo", "Cholesterol Value", "Cholesterol Unit", "Cholesterol Reference Range", "Pool ID"].map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {header}
              </th>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((contribution) => (
              <tr key={contribution.credential_id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
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
        </table> */}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`h-8 w-8 mx-1 rounded border border-gray-200 ${index + 1 === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-900"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CredentialsComponent;