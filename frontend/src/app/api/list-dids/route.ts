// app/api/list-dids/route.ts
// import { DIDProfiles } from '@/types';
import { NextResponse } from "next/server";
const [dockUrl, dockApiKey] = [
  process.env.NEXT_PUBLIC_TEST_URL,
  process.env.NEXT_PUBLIC_TEST_API_KEY
];

export async function GET() {
  const res = await fetch(`${dockUrl}/dids`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": `${dockApiKey}`
    }
  });
  const data = await res.json();
  // console.log(`${dockUrl}/dids:`, data)
  return NextResponse.json({ data });
}
