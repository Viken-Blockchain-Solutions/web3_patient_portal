import { dockApiKey } from "./envVariables";

interface ApiPostParams {
  url: string;
  body?: object | null;
}

export async function apiPost({ url, body }: ApiPostParams) {
  const result = await fetch(url, {
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "DOCK-API-TOKEN": dockApiKey
    },
    body: JSON.stringify(body),
    method: "POST"
  });

  const data = await result.json();
  console.log("apiPost:", data);

  if (result.status >= 400) {
    throw new Error(`API Error: ${result.status} ${data.message}`);
  }

  return data;
}

export async function apiGet({ url }: ApiPostParams) {
  const response = await fetch(url, {
    headers: {
      "accept": "application/json",
      "content-type": "application/json",
      "DOCK-API-TOKEN": dockApiKey
    },
    method: "GET"
  });

  const data = await response.json();
  console.log("apiGet:", data);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${data.message || JSON.stringify(data)}`);
  }

  return data;
}
