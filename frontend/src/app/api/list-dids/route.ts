// app/api/list-dids/route.ts
import { DIDProfiles } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const dockApiKey = process.env.NEXT_PUBLIC_TEST_API_KEY as string;

export async function GET(request: NextRequest) {

    const res = await fetch(`${dockUrl}/dids`, {
        headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg',
        },
    })
    const data: DIDProfiles = await res.json()
    // console.log(`${dockUrl}/dids:`, data)
    return NextResponse.json({ data })
}