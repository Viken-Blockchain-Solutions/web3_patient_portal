import { NextResponse, NextRequest } from 'next/server';
// import type { SchemaDefinition as Schemas } from '@/types';
import 'dotenv/config';

const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const apiToken = process.env.NEXT_PUBLIC_TEST_API_TOKEN;

export async function GET(request: NextRequest) {
    const res = await fetch(`${dockUrl}/schemas`, {
        headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTMwNTE3MSwiZXhwIjo0Nzc4NjAxMTcxfQ.nUnHQyBE1qz59oKALpQtDehxRZal1-ozdA59YnVI3A2W9KrulEUs1Ltga3rKdKlRUjHrHd8XE61MlE2o9sdLCg',
        },
    })

    const data = await res.json()
    //console.log(`${dockUrl}/schemas:`, data)
    console.log(`schemas:`, await data.length)
    return NextResponse.json({ data })
}