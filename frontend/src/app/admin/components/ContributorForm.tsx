// admin/components/ContributorForm.tsx
import React from "react";
import { Contributor } from "../../../../types";

type ContributorFormProps = {
  newContributor: Contributor;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ContributorForm: React.FC<ContributorFormProps> = ({ newContributor, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {/* Add form fields for each contributor attribute */}
      {/* Example: contributor_did */}
      <div className="mb-4">
        <label htmlFor="contributor_did" className="block text-gray-700">Contributor DID</label>
        <input
          type="text"
          id="contributor_did"
          name="contributor_did"
          placeholder="Enter contributor DID"
          value={newContributor.contributor_did}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      {/* Add more fields for other properties like name, phone_number, etc. */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Contributor
      </button>
    </form>
  );
};

export default ContributorForm;
