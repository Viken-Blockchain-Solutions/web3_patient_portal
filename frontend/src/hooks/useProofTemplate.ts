// src/utils/hooks/useProofTemplate.ts
"use Client";
import { useState, useEffect, useCallback } from "react";
import { apiPost, apiGet } from "../utils/apiUtils";
import { dockUrl } from "../utils/envVariables";

interface ProofRequest {
  id: string | null;
  status: boolean | null;
  data: any | null;
  holderDID: string;
  credentials: any[];
}

export const useProofTemplate = (setQrCodeUrl: (url: string) => void, setError: (error: string) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proofRequest, setProofRequest] = useState<ProofRequest>({
    id: null,
    status: null,
    data: null,
    holderDID: "",
    credentials: []
  });

  const proofRequestBody = {
    "nonce": "123456",
    "domain": "dock.io"
  };

  const generateProofRequestQR = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiPost({
        url: `${dockUrl}/proof-templates/9e752f3c-1e6d-41e7-bd7d-0a3290ef0ebe/request`,
        body: proofRequestBody
      });

      const qrCodeUrl = response.qr;
      if (qrCodeUrl) {
        setQrCodeUrl(qrCodeUrl);
        setProofRequest({ ...proofRequest, id: response.id });
      } else {
        throw new Error("QR Code URL not found in response");
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  }, [proofRequest, setQrCodeUrl, setError]);

  const fetchProofData = useCallback(async () => {
    if (!proofRequest.id) return;

    try {
      const dataResponse = await apiGet({
        url: `${dockUrl}/proof-requests/${proofRequest.id}`
      });

      const holder = dataResponse.presentation?.holder;
      const credentials = dataResponse.presentation?.credentials;

      setProofRequest({ ...proofRequest, data: dataResponse, holderDID: holder, credentials });
    } catch (err) {
      setError(`Error fetching proof data: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  }, [proofRequest, setError]);

  const checkProofRequestStatus = useCallback(async () => {
    if (!proofRequest.id) return;

    try {
      const statusResponse = await apiGet({
        url: `${dockUrl}/proof-requests/${proofRequest.id}`
      });

      const isVerified = statusResponse.verified;
      if (isVerified !== proofRequest.status) {
        setProofRequest({ ...proofRequest, status: isVerified });
        if (isVerified && !proofRequest.data) {
          await fetchProofData();
        }
      }
    } catch (err) {
      setError(`Error checking proof request status: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  }, [proofRequest, fetchProofData, setError]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkProofRequestStatus();
    }, 5000); // Polling every 5 seconds

    return () => clearInterval(intervalId);
  }, [checkProofRequestStatus]);

  return {
    isLoading,
    proofRequestStatus: proofRequest.status,
    holderDID: proofRequest.holderDID,
    holderCredentials: proofRequest.credentials,
    generateProofRequestQR
  };
};
