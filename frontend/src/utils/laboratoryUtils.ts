// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { createCholesterolCredential } from "./credentials/cholesterolCredential";
import { createBloodTestCredential } from "./credentials/bloodCredential";
import { createDiabetesCredential } from "./credentials/diabetesMonitoring";
import { toast } from "react-toastify";
import { IssueTestResultResponse, EncryptionPayload   } from "../../types";


/**
 * Encrypts and prepares a message for a receiver.
 *
 * @param {string} receiverDID - The DID of the receiver.
 * @param {any[]} credentialsSubject - An array of credentials.
 * @return {Promise<string>} The encrypted message.
 */
async function encryptAndPrepareMessage(receiverDID: string, credentialsSubject: any[]): Promise<string> {
  const encryptionPayload: EncryptionPayload = {
    senderDid: dockIssuerDid,
    recipientDids: [receiverDID],
    type: "issue",
    payload: {
      domain: "api.dock.io",
      credentials: credentialsSubject
    }
  };

  const didcommMessage = await apiPost({
    url: `${dockUrl}/messaging/encrypt`,
    body: encryptionPayload
  });

  return didcommMessage.jwe;
}

/**
 * Sends a test result to a receiver.
 *
 * @param {string} receiverDID - The receiver's DID.
 * @param {(loading: boolean) => void} setIsLoading - A callback function to set the loading state.
 * @param {(url: string) => void} setQrUrl - A callback function to set the QR code URL.
 * @return {Promise<IssueTestResultResponse>} A promise that resolves with the response of issuing the test result.
 */
export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: (loading: boolean) => void,
  setQrUrl: (url: string) => void
): Promise<IssueTestResultResponse> => {
  try {
    setIsLoading(true);
    const issuedCredentials = await signedLabCredential(receiverDID);
    const credentialsSubject = issuedCredentials.map(cred => cred.credentialSubject);

    const encryptedMessage = await encryptAndPrepareMessage(receiverDID, credentialsSubject);

    const sendMessagePayload = {
      to: receiverDID,
      message: encryptedMessage
    };

    const { qrUrl: qrUrlResponse } = await apiPost({
      url: `${dockUrl}/messaging/send`,
      body: sendMessagePayload
    });

    setQrUrl(qrUrlResponse);

    return {
      sent: true,
      qrUrl: qrUrlResponse,
      issuedCredentials: issuedCredentials
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    toast.error(`Error: ${errorMessage}`);
    return { sent: false, error: errorMessage };
  } finally {
    setIsLoading(false);
  }
};

const signedLabCredential = async (receiverDid: string) => {
  const cholesterolCredential = createCholesterolCredential(receiverDid);
  const bloodTestCredential = createBloodTestCredential(receiverDid);
  const diabetesMonitoringCredential = createDiabetesCredential(receiverDid);

  const credentials = [
    cholesterolCredential,
    bloodTestCredential,
    diabetesMonitoringCredential
  ];

  const issuedCredentials = await Promise.all(credentials.map(async credential => {
    return apiPost({
      url: credential.url,
      body: credential.body
    });
  }));
  console.log("issuedCredentials:", issuedCredentials);
  return issuedCredentials;
};

