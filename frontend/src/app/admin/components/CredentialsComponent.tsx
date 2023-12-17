// admin/components/CredentialsComponent.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../db/supabaseClient";
import { Contribution } from "../../../../types";
import { convertToCET, truncateString } from "../../../utils/tools";

const CredentialsComponent: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchContributions = async () => {
      const { data, error } = await supabase.from("new_contributions").select("*");
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      setContributions(
        (data || []).sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
      );
    };

    fetchContributions();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contributions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(contributions.length / itemsPerPage);
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="container mx-auto p-4">
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
      <h1 className="text-lg font-bold text-center mb-4">Credentials</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["Submitted At", "Credential ID", "Contributor DID", "Verified Status", "Test Name", "Test Result", "Proof Template", "Issuer ID", "Issuer Name"].map((header) => (
                <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((contribution, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 w-fit">{convertToCET(contribution.submitted_at as string)}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{truncateString(contribution.credential_id)}</td>
                <td className="px-4 py-2">{truncateString(contribution.contributor_did)}</td>
                <td className="px-4 py-2">{contribution.verified_status ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{contribution.test_name}</td>
                <td className="px-4 py-2">{JSON.stringify(contribution.test_result)}</td>
                <td className="px-4 py-2">{truncateString(contribution.proof_template)}</td>
                <td className="px-4 py-2">{truncateString(contribution?.issuer_id as string)}</td>
                <td className="px-4 py-2">{contribution.issuer_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CredentialsComponent;