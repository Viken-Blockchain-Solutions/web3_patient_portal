import { v4 as uuidv4 } from "uuid";

const API_KEY = process.env.NEXT_PUBLIC_TEST_API_KEY as string;
const NEXT_PUBLIC_TEST_URL = process.env.NEXT_PUBLIC_TEST_URL;

interface ApiPostParams {
  url: string;
  body: object;
}

export async function apiPost({ url, body }: ApiPostParams) {
  const result = await fetch(url, {
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "DOCK-API-TOKEN": API_KEY
    },
    body: JSON.stringify(body),
    method: "POST"
  });

  const data = await result.json();

  if (result.status >= 400) {
    throw new Error(`API Error: ${result.status} ${data.message}`);
  }

  return data;
}

export async function getCredentials(issuerDid: string, receiverDid: string) {
  const credentials = [];
  for (let i = 0; i < 1; i++) {
    const credential = await apiPost({
      url: `${NEXT_PUBLIC_TEST_URL}/credentials`,
      body: {
        distribute: false,
        persistent: true,
        credential: {
          id: `urn:uuid:${uuidv4()}`,
          name: "Lab Test Verification",
          description: "A verifiable credential for a lab test result.",
          type: ["VerifiableCredential", "LabTestVerification"],
          issuer: { id: issuerDid, name: "VBS - Labs" },
          subject: {
            id: receiverDid,
            testName: "Lipid Panel",
            results: {
              totalCholesterol: {
                value: "150",
                unit: "mg/dL",
                referenceRange: "50-250 mg/dL"
              }
            }
          }
        }
      }
    });
    credentials.push(credential);
  }
  return credentials;
}
