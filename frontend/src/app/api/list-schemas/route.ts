import { NextResponse } from "next/server";
// import type { SchemaDefinition as Schemas } from '@/types';
const [dockUrl, dockApiKey] = [
  process.env.NEXT_PUBLIC_TEST_URL,
  process.env.NEXT_PUBLIC_TEST_API_KEY
];

export async function GET() {
  const res = await fetch(`${dockUrl}/schemas`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": `"${dockApiKey}"`
    }
  });

  const data = await res.json();
  //console.log(`${dockUrl}/schemas:`, data)
  console.log("schemas:", await data.length);
  return NextResponse.json({ data });
}
