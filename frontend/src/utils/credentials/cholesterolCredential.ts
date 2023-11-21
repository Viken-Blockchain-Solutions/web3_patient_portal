import { dockUrl, dockIssuerDid } from "../envVariables";
import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "../tools";

export function createCholesterolCredential(receiverDid: string) {
  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      persist: true,
      password: "1234",
      distribute: true,
      schema: "https://schema.dock.io/LabTestVerification-V1.0-1700013941542.json",
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Lab Test Verification",
        description: "A verifiable credential for a cholesterol lab test result.",
        type: [
          "VerifiableCredential",
          "LabTestVerification"
        ],
        issuer: {
          id: dockIssuerDid,
          name: "VBS - Labs"
        },
        subject: {
          id: receiverDid,
          testName: "Lipid Panel",
          results: {
            totalCholesterol: {
              value: `${getRandomNumber(50, 250)}`,
              unit: "mg/dL",
              referenceRange: "50-250 mg/dL"
            }
          }
        }
      }
    }
  };
}
