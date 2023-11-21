// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { createCholesterolCredential } from "./credentials/cholesterolCredential";
import { createBloodTestCredential } from "./credentials/bloodCredential";
import { createDiabetesCredential } from "./credentials/diabetesMonitoring";
import { toast } from "react-toastify";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setQrUrl: any
) => {
  try {
    setIsLoading(true);
    const issuedCredentials = await signedLabCredential(receiverDID);

    const credentialsSubject = issuedCredentials.map(cred => cred.credentialSubject);

    const encryptionPayload = {
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

    const sendMessagePayload = {
      to: receiverDID,
      message: didcommMessage.jwe
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
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(`Error: ${errorMessage}`);
    return { success: false, error: errorMessage };
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

