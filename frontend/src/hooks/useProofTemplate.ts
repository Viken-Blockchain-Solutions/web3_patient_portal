// src/utils/hooks/useProofTemplate.ts
"use Client";
import { useState, useEffect, useCallback } from "react";
import { apiPost, apiGet } from "../utils/apiUtils";
import { dockUrl } from "../utils/envVariables";
import { toast } from "react-toastify"

interface ProofRequest {
  id: string;
  status: boolean;
  data: any | null;
  holderDID: string;
  credentials: any[];
}

export const useProofTemplate = (setQrCodeUrl: (url: string) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proofRequest, setProofRequest] = useState<ProofRequest>({
    id: "",
    status: false,
    data: null,
    holderDID: "",
    credentials: []
  });

  const generateProofRequestQR = useCallback(async () => {
    const proofRequestBody = {
      "nonce": "123456",
      "domain": "dock.io"
    };

    setIsLoading(true);


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
      toast.error(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  }, [setQrCodeUrl, proofRequest]);

  const fetchProofData = useCallback(async () => {
    if (!proofRequest.id) return;

    try {
      const dataResponse = await apiGet({
        url: `${dockUrl}/proof-requests/${proofRequest.id}`
      });

      const holder: string = dataResponse.presentation?.holder;
      const credentials = dataResponse.presentation?.credentials;
      setProofRequest({ ...proofRequest, data: dataResponse, holderDID: holder, credentials });
    } catch (err) {
      toast.error(`Error fetching proof data: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  }, [proofRequest]);

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
      console.log(err);
      toast.error(`Error checking proof request status: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    }
  }, [proofRequest, fetchProofData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkProofRequestStatus();
    }, 5000); // Polling every 5 seconds

    if (proofRequest.status === true) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [checkProofRequestStatus, proofRequest.status]);


  return {
    isLoading,
    proofRequestID: proofRequest.id,
    proofRequestData: proofRequest.data,
    proofRequestStatus: proofRequest.status,
    holderDID: proofRequest.holderDID,
    holderCredentials: proofRequest.credentials,
    generateProofRequestQR
  };
};
