// In /utils/laboratoryUtils.ts
import { apiPost, getCredentials } from "./apiUtils";

export const issueTestResult = async (receiverDID: string, setIsLoading: any, setError: any, setQrUrl: any) => {
  try {
    setIsLoading(true);
    setError("");

    const credentials = await getCredentials(process.env.NEXT_PUBLIC_ISSUER_DID as string, receiverDID);

    const didcommMessage = await apiPost({
      url: `${process.env.NEXT_PUBLIC_TEST_URL}/messaging/encrypt`,
      body: {
        senderDid: process.env.NEXT_PUBLIC_ISSUER_DID,
        recipientDids: [receiverDID],
        type: "issue",
        payload: { domain: "api.dock.io", credentials }
      }
    });

    const { qrUrl: qrUrlResponse } = await apiPost({
      url: `${process.env.NEXT_PUBLIC_TEST_URL}/messaging/send`,
      body: { to: receiverDID, message: didcommMessage.jwe }
    });

    setQrUrl(qrUrlResponse);
    return true; // Indicating success
  } catch (error) {
    setError(`Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`);
    return false; // Indicating failure
  } finally {
    setIsLoading(false);
  }
};
