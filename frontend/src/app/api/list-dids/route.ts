// app/api/list-dids/route.ts
// import { DIDProfiles } from '@/types';
import { NextResponse } from "next/server";
import { dockUrl, dockApiKey } from "../../../utils/envVariables";

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
