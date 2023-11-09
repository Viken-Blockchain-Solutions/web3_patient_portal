import { NextResponse } from "next/server";
const [dockUrl, dockApiKey] = [
  process.env.NEXT_PUBLIC_TEST_URL,
  process.env.NEXT_PUBLIC_TEST_API_KEY
];

export async function GET() {
  const res = await fetch(`${dockUrl}/anchors`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": `"${dockApiKey}"`
    }
  });

  const data = await res.json();
  // console.log(`${dockUrl}/anchors:`, data)
  return NextResponse.json({ data });
}
