import { NextResponse } from "next/server";
import { dockUrl, dockApiKey } from "../../../utils/envVariables";

export async function GET() {
  const res = await fetch(`${dockUrl}/anchors`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": `${dockApiKey}`
    }
  });

  const data = await res.json();
  // console.log(`${dockUrl}/anchors:`, data)
  return NextResponse.json({ data });
}
