// admin/components/ContributorTable.tsx
import React from "react";
import { Contributor } from "../../../../types";
import { supabase } from "../../../../db/supabaseClient";
import { convertToCET } from "../../../../src/utils/tools";

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
      setContributors(prevContributors => prevContributors.filter(contributor => contributor.contributor_did !== contributorDid));
    }
  };

  return (
    <div className="rounded-lg border border-gray-200">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100 ltr:text-left rtl:text-right">{["DID", "Registration Date", "Actions"].map((header) => (
            <th key={header} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {header}
            </th>
          ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contributors.map((contributor, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">did:key:{contributor.contributor_did}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{convertToCET(contributor.registration_date)}</td>
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
    </div>
  );
};

export default ContributorTable;