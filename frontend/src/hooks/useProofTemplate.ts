"use Client";
import { apiPost, apiGet } from "../utils/apiUtils";
import { useState, useEffect } from "react";
import { dockUrl } from "../utils/envVariables";

export const useProofTemplate = (setQrCodeUrl: any, setError: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [proofRequestId, setProofRequestId] = useState(null);
  const [proofRequestStatus, setProofRequestStatus] = useState(null);
  const [proofData, setProofData] = useState(null);
  const [holderDID, setHolderDID] = useState("");
  const [holderCredentials, setHolderCredentials] = useState([]);

  const proofRequestBody = {
    "nonce": "123456",
    "domain": "dock.io"
  };

  const generateProofRequestQR = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiPost({
        url: `${dockUrl}/proof-templates/9e752f3c-1e6d-41e7-bd7d-0a3290ef0ebe/request`,
        body: proofRequestBody
      });
      console.log("Response:", await response.qr);
      const _qrCodeUrl = await response.qr;
      if (_qrCodeUrl) {
        setQrCodeUrl(_qrCodeUrl);
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
      console.log("Status Response:", statusResponse);
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

  console.log("useProofRequest:", {
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
    generateProofRequestQR
  };
};
