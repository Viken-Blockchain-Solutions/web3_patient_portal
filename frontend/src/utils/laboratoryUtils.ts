// frontend/src/utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "../utils/tools";
import { toast } from "react-toastify";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setQrUrl: any
) => {

  try {
    setIsLoading(true);

    const { id, credentialSubject } = await signedLabCredential(dockIssuerDid, receiverDID);

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
              value: `${getRandomNumber()}`,
              unit: "mg/dL",
              referenceRange: "50-250 mg/dL"
            }
          }
        }
      }
    }
  });

  return labCredential;
};
