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
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Cholesterol Study Credential",
        description: "A verifiable credential for a cholesterol lab test result.",
        type: [
          "VerifiableCredential",
          "CholesterolStudyCredential"
        ],
        issuer: dockIssuerDid,
        credentialSubject: {
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
