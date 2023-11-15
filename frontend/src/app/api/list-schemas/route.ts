import { NextResponse } from "next/server";
import { dockUrl, dockApiKey } from "../../../utils/envVariables";

export async function GET() {
  const res = await fetch(`${dockUrl}/schemas`, {
    headers: {
      "Content-Type": "application/json",
      "DOCK-API-TOKEN": `${dockApiKey}`
    }
  });

  const data = await res.json();
  //console.log(`${dockUrl}/schemas:`, data)
  console.log("list-schemas:route:", await data.length);
  return NextResponse.json({ data });
}
