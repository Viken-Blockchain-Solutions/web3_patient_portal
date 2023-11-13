// In /hooks/useDIDVerification.js
import { useState, useEffect } from "react";
import { apiPost, apiGet } from "../utils/apiUtils";
import { dockUrl } from "../utils/envVariables";

export const useDIDVerification = (setQrCodeUrl: any, setError: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [proofRequestId, setProofRequestId] = useState(null);
  const [proofRequestStatus, setProofRequestStatus] = useState(null);
  const [proofData, setProofData] = useState(null);
  const [holderDID, setHolderDID] = useState("");
  const [holderCredentials, setHolderCredentials] = useState([]);

  const generateDIDVerificationQR = async () => {
    setIsLoading(true);
    setError("");

    const proofRequestBody = {
      name: "Proof Request",
      purpose: "Prove identity",
      request: {
        input_descriptors: [{
          id: "ProofOfIdentity",
          name: "Subject Id Proof Request",
          purpose: "Provide your did to receive your LabResults",
          constraints: {
            fields: [{
              path: ["$.credentialSubject.id"]
            }]
          }
        }]
      }
    };

    try {
      const response = await apiPost({
        url: `${process.env.NEXT_PUBLIC_TEST_URL}/proof-requests`,
        body: proofRequestBody
      });
      // console.log("Response:", response);
      if (response.qr) {
        setQrCodeUrl(response.qr);
        setProofRequestId(response.id);
      } else {
        throw new Error("QR Code URL not found in response");
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const checkProofRequestStatus = async () => {
    if (!proofRequestId) return;

    try {
      const statusResponse = await apiGet({
        url: `${dockUrl}/proof-requests/${proofRequestId}`
      });
      // console.log("Status Response:", statusResponse);
      const isVerified = statusResponse.verified;
      setProofRequestStatus(isVerified);

      if (isVerified && !proofData) {
        await fetchProofData();
      }
    } catch (err) {
      setError(`Error checking proof request status: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  };

  const fetchProofData = async () => {
    if (!proofRequestId) return;

    try {
      const dataResponse = await apiGet({
        url: `${dockUrl}/proof-requests/${proofRequestId}`
      });
      // console.log("Data Response presentation:", dataResponse.presentation);
      const holder = dataResponse.presentation?.holder;
      const credentials = dataResponse.presentation?.credentials;

      setProofData(dataResponse);
      setHolderDID(holder);
      setHolderCredentials(credentials);
    } catch (err) {
      setError(`Error fetching proof data: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkProofRequestStatus();
    }, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId);
  });

  console.log("useDIDVerification", {
    proofRequestId,
    proofRequestStatus,
    proofData,
    holderDID,
    holderCredentials
  });

  return {
    isLoading,
    proofRequestStatus,
    holderDID,
    holderCredentials,
    generateDIDVerificationQR
  };
};
