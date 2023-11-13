"use client";
import { useState } from "react";
import { issueTestResult } from "../utils/laboratoryUtils";

export const IssueVCLabButton = ({ props }: any) => {
  const [isIssued, setIsIssued] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { holderDID, setQrUrl, setIsModalOpen, setError } = props;

  const handleIssueTestResult = async () => {
    setIsLoading(true);
    if (!holderDID) {
      console.log("holderDID is empty");
      return;
    }
    try {
      const result = await issueTestResult(holderDID, setIsLoading, setError, setQrUrl);
      if (result) {
        console.log("issueTestResult result:", result);
        setIsModalOpen(true);
        setIsIssued(true);
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isIssued ? (
        <p>Test result issued successfully!</p>
      ) : (
        <button
          onClick={handleIssueTestResult}
          disabled={isLoading}
          className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Generating..." : "Step 2: Issue Lab Result"}
        </button>
      )}
    </div>
  );
};