import { dockUrl, dockIssuerDid } from "../envVariables";
import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "../tools";

export function createBloodTestCredential(receiverDid: string) {
  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      persist: true,
      password: "1234",
      distribute: true,
      algorithm: "dockbbs+",
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Blood Test Credential",
        description: "A verifiable credential for a general blood test result.",
        type: [
          "VerifiableCredential",
          "BloodTestCredential"
        ],
        issuer: {
          id: dockIssuerDid
        },
        subject: {
          id: receiverDid,
          testName: "General Blood Test",
          results: {
            hemoglobin: {
              value: `${getRandomNumber(12, 18)}`,
              unit: "g/dL",
              referenceRange: "12-18 g/dL"
            },
            whiteBloodCellCount: {
              value: `${getRandomNumber(4, 11)}`,
              unit: "x10^9/L",
              referenceRange: "4-11 x10^9/L"
            },
            plateletCount: {
              value: `${getRandomNumber(150, 450)}`,
              unit: "x10^9/L",
              referenceRange: "150-450 x10^9/L"
            }
          }
        }
      }
    }
  };
}
