import { dockUrl, dockIssuerDid } from "../envVariables";
import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "../tools";

export function createDiabetesCredential(receiverDid: string) {
  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      distribute: true,
      persist: true,
      password: "1234",
      algorithm: "dockbbs+",
      schema: "https://schema.dock.io/DiabetesMonitoring-V2-1700439747437.json",
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Diabetes Monitoring",
        description: "A verifiable credential for Diabetes Monitoring lab test results. This credential support BBS+ algorithm. Which allows for selective disclosure of certain data.",
        type: [
          "VerifiableCredential",
          "DiabetesMonitoring"
        ],
        issuer: {
          id: dockIssuerDid,
          name: "VBS - Labs"
        },
        subject: {
          id: receiverDid,
          testName: "Diabetes Monitoring",
          results: {
            glucoseLevel: {
              value: `${getRandomNumber(70, 130)}`,
              unit: "mg/dL",
              referenceRange: "70-130 mg/dL (fasting)"
            },
            hba1c: {
              value: `${(getRandomNumber(40, 70) / 10).toFixed(1)}`,
              unit: "%",
              referenceRange: "4.0% - 7.0%"
            },
            insulinLevel: {
              value: `${getRandomNumber(2, 20)}`,
              unit: "µU/mL",
              referenceRange: "2-20 µU/mL (fasting)"
            }
          }
        }
      }
    }
  };
}
