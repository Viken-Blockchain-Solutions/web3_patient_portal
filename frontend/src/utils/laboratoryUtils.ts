// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { v4 as uuidv4 } from "uuid";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setError: any,
  setQrUrl: any
) => {
  // console.log("issueTestResult called with receiverDID:", receiverDID);

  try {
    setIsLoading(true);
    setError("");

    // console.log("Requesting signed lab credential");
    const {
      id,
      credentialSubject,
      credentialSchema,
      cryptoVersion,
      description,
      issuanceDate,
      issuer,
      name,
      proof,
      type
    } = await signedLabCredential(dockIssuerDid, receiverDID);
    console.log("Received lab credential:", {
      id,
      credentialSubject,
      credentialSchema,
      cryptoVersion,
      description,
      issuanceDate,
      issuer,
      name,
      proof,
      type
    });

    const encryptionPayload = {
      senderDid: dockIssuerDid,
      recipientDids: [receiverDID],
      type: "issue",
      payload: {
        domain: "api.dock.io",
        credentials: credentialSubject
      }
    };
    // console.log("Encrypting payload:", encryptionPayload);
    const didcommMessage = await apiPost({
      url: `${dockUrl}/messaging/encrypt`,
      body: encryptionPayload
    });
    console.log("Received encrypted message:", didcommMessage);

    const sendMessagePayload = {
      to: receiverDID,
      message: didcommMessage.jwe
    };

    //console.log("Sending message:", sendMessagePayload);
    const { qrUrl: qrUrlResponse } = await apiPost({
      url: `${dockUrl}/messaging/send`,
      body: sendMessagePayload
    });
    console.log("Received QR URL response:", qrUrlResponse);

    setQrUrl(qrUrlResponse);

    console.log("Successfully issued test result", {
      success: true,
      credentialId: id,
      qrUrl: qrUrlResponse
    });

    return {
      success: true,
      credentialId: id,
      qrUrl: qrUrlResponse
    };

  } catch (error) {
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error in issueTestResult:", errorMessage);
    setError(`Error: ${errorMessage}`);
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading(false);
    // console.log("issueTestResult completed");
  }
};


const signedLabCredential = async (issuerDid: string, receiverDid: string) => {
  const labCredential = await apiPost({
    url: `${dockUrl}/credentials`,
    body: {
      persist: true,
      password: "1234",
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Lab Test Verification",
        description: "A verifiable credential for a lab test result.",
        type: [
          "VerifiableCredential",
          "LabTestVerification"
        ],
        issuer: {
          id: issuerDid,
          name: "VBS - Labs"
        },
        subject: {
          id: `${receiverDid}`,
          testName: "Lipid Panel",
          results: {
            totalCholesterol: {
              value: "150",
              unit: "mg/dL",
              referenceRange: "50-250 mg/dL"
            }
          }
        }
      }
    }
  });
  console.log("Get Issued Credential from here:", {
    "Password": "1234",
    "Credential Link": labCredential.id
  });

  // console.log("Received signed lab credential ID:", labCredential.id);
  // console.log("Received signed lab credential:", labCredential);
  return labCredential;
};
