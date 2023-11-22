// admin/components/ContributorTable.tsx
import React from "react";
import { Contributor } from "../../../../types";
import { supabase } from "../../../db/supabaseClient";

type ContributorTableProps = {
  contributors: Contributor[];
  setContributors: React.Dispatch<React.SetStateAction<Contributor[]>>; // Ensure this type matches the state setter type
};

const ContributorTable: React.FC<ContributorTableProps> = ({ contributors, setContributors }) => {
  const deleteContributor = async (contributorDid: string) => {
    const { error } = await supabase.from("contributors").delete().eq("contributor_did", contributorDid);

    if (error) {
      console.error("Error deleting contributor:", error);
    } else {
      // Update the state to remove the deleted contributor
      setContributors(prevContributors => prevContributors.filter(contributor => contributor.contributor_did !== contributorDid));
    }
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100 ltr:text-left rtl:text-right">{["DID", "Name", "Phone Number", "Country", "Age", "Gender", "Medical Conditions", "Consent Given", "Registration Date"].map((header) => (
            <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {header}
            </th>
          ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contributors.map((contributor, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{contributor.contributor_did}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.phone_number}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.country}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.age}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.gender}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.medical_conditions}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contributor.consent_given ? "Yes" : "No"}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <button
                    onClick={() => deleteContributor(contributor.contributor_did)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination or other controls can be added here */}
    </div>
  );
};

export default ContributorTable;