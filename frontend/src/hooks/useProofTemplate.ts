// src/utils/hooks/useProofTemplate.ts
"use Client";
import { useState, useEffect, useCallback } from "react";
import { apiPost, apiGet } from "../utils/apiUtils";
import { dockUrl } from "../utils/envVariables";
import { toast } from "react-toastify";
import { generateNonce } from "./../utils/tools";
import { Contribution, ProofResponse } from "../../types";
import { supabase } from "../db/supabaseClient";


/**
 * Generates a proof request QR code and updates the QR code URL.
 *
 * @param {string} proofTemplateID - The ID of the proof template.
 * @param {(url: string) => void} setQrCodeUrl - A function to set the QR code URL.
 * @return {void}
 */
export const useProofTemplate = (proofTemplateID: string, setQrCodeUrl: (url: string) => void) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proofResponse, setProofResponse] = useState<ProofResponse>({
    id: "",
    status: false,
    data: null,
    holderDID: "",
    credentials: []
  });

  const generateProofRequestQR = useCallback(async () => {
    const proofResponseBody = {
      "nonce": `${generateNonce()}`,
      "domain": "dock.io"
    };

    setIsLoading(true);

    try {
      const response = await apiPost({
        url: `${dockUrl}/proof-templates/${proofTemplateID}/request`,
        body: proofResponseBody
      });

      const qrCodeUrl = response.qr;
      if (qrCodeUrl) {
        setQrCodeUrl(qrCodeUrl);
        setProofResponse({ ...proofResponse, id: response.id });
      } else {
        throw new Error("QR Code URL not found in response");
      }

    } catch (err) {
      toast.error(`Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  }, [proofTemplateID, setQrCodeUrl, proofResponse]);


  const fetchProofData = useCallback(async () => {
    if (!proofResponse.id) return;

    const dataResponse = await apiGet({
      url: `${dockUrl}/proof-requests/${proofResponse.id}`
    });

    const holder: string = dataResponse.presentation?.holder;
    const credentials = dataResponse.presentation?.credentials;

    setProofResponse({ ...proofResponse, data: dataResponse, holderDID: holder, credentials: credentials });
    console.log("Data Response:", dataResponse);
    const credentialId = credentials.id as string;

    const { data: existingData, error: selectError } = await supabase
      .from("new_contributions")
      .select("credential_id")
      .eq("credential_id", credentialId);

    if (selectError) {
      return false;
    }

    if (existingData && existingData.length > 0) {
      console.log("Credential already exists in the database.");
      return false;
    }

    for (const credential of credentials) {
      const contributionData: Contribution = {
        credential_id: credential.id as string,
        contributor_did: credential.credentialSubject.id.split("did:key:")[1],
        test_name: credential.credentialSubject.testName,
        issuer_id: credential.issuer.id,
        issuer_name: credential.issuer.name,
        issuer_logo: credential.issuer.logo,
        test_result: credential.credentialSubject.results,
        proof_template: proofTemplateID,
        verified_status: proofResponse.status
      };

      const { error } = await supabase
        .from("new_contributions")
        .insert([contributionData]);

      if (error) {
        console.error("Error adding to Supabase:", error);
      }

    }
  }, [proofResponse, proofTemplateID]);

  // Check proof response status is used to check if the proofResponse has been verified.
  const checkProofResponseStatus = useCallback(async () => {
    if (!proofResponse.id) return;

    const statusResponse = await apiGet({
      url: `${dockUrl}/proof-requests/${proofResponse.id}`
    });

    const isVerified = statusResponse.verified;
    if (isVerified !== proofResponse.status) {
      setProofResponse({ ...proofResponse, status: isVerified });
      if (isVerified && !proofResponse.data) {
        await fetchProofData();
      }
    }

  }, [proofResponse, fetchProofData]);

  // Will call the checkProofResponseStatus function every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkProofResponseStatus();
    }, 5000); // Polling every 5 seconds

    if (proofResponse.status === true) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [checkProofResponseStatus, proofResponse.status]);


  return {
    isLoading,
    proofResponseID: proofResponse.id,
    proofResponseData: proofResponse.data,
    proofResponseStatus: proofResponse.status,
    holderDID: proofResponse.holderDID,
    holderCredentials: proofResponse.credentials,
    generateProofRequestQR
  };
};
