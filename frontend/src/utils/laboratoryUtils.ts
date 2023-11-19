// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { createCholesterolCredential } from "./credentials/cholesterolCredential";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setError: any,
  setQrUrl: any
) => {

  try {
    setIsLoading(true);
    setError("");

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
    } = await signedLabCredential(receiverDID);

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


const signedLabCredential = async (receiverDid: string) => {
  const cholesterolCredential = createCholesterolCredential(receiverDid);

  const signedCredential = await apiPost(cholesterolCredential);

  console.log("Get Issued Credential from here:", {
    "Password": "1234",
    "Credential Link": signedCredential.id
  });

  return signedCredential;
};
