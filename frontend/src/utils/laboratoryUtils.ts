// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { createCholesterolCredential } from "./credentials/cholesterolCredential";
import { toast } from "react-toastify";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setQrUrl: any
) => {

  try {
    setIsLoading(true);
    const { id, credentialSubject } = await createCholesterolCredential(dockIssuerDid, receiverDID);

    const encryptionPayload = {
      senderDid: dockIssuerDid,
      recipientDids: [receiverDID],
      type: "issue",
      payload: {
        domain: "api.dock.io",
        credentials: credentialSubject
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
      success: true,
      credentialId: id,
      qrUrl: qrUrlResponse
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

  const signedCredential = await apiPost({
    "url": cholesterolCredential.url,
    "body": cholesterolCredential.body
  });

  return labCredential;
};
