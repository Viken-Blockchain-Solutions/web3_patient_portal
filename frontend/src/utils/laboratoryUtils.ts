// In /utils/laboratoryUtils.ts
import { dockIssuerDid, dockUrl } from "./envVariables";
import { apiPost } from "./apiUtils";
import { v4 as uuidv4 } from "uuid";

export const issueTestResult = async (
  receiverDID: string,
  setIsLoading: any,
  setError: any,
  setQrUrl: any
) => {
  try {
    setIsLoading(true);
    setError("");

    const { credentials: labCredential } = await signedLabCredential(dockIssuerDid, receiverDID);

    const didcommMessage = await apiPost({
      url: `${dockUrl}/messaging/encrypt`,
      body: {
        issuerDid: dockIssuerDid,
        recipientDid: receiverDID,
        type: "issue",
        payload: {
          domain: "api.dock.io",
          labCredential
        }
      }
    });

    const { qrUrl: qrUrlResponse } = await apiPost({
      url: `${dockUrl}/messaging/send`,
      body: {
        to: receiverDID,
        message: didcommMessage.jwe
      }
    });

    console.log("Signed Lab Credential URL:", qrUrlResponse);
    setQrUrl(qrUrlResponse);
    return true;
  } catch (error) {
    setError(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    return false;
  } finally {
    setIsLoading(false);
  }
};

const signedLabCredential = async (receiverDid: string, issuerDid: string) => {
  const labCredential = await apiPost({
    url: `${dockUrl}/credentials`,
    body: {
      distribute: true,
      persist: true,
      password: "1234",
      credential: {
        id: uuidv4(),
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
          id: receiverDid,
          testName: "Lipid Panel",
          results: {
            totalCholesterol: {
              referenceRange: "50-250 mg/dL",
              value: "150",
              unit: "mg/dL"
            }
          }
        }
      }
    }
  });
  return labCredential;
};
