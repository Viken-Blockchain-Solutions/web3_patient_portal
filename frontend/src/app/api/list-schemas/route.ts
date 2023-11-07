import { NextResponse, NextRequest } from 'next/server';
import type { SchemaDefinition as Schemas } from '@/types';
import 'dotenv/config';

const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;

export async function GET(request: NextRequest) {
    const res = await fetch(`${dockUrl}/schemas`, {
        headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': 'eyJzY29wZXMiOlsidGVzdCIsImFsbCJdLCJzdWIiOiIxMDg5MSIsInNlbGVjdGVkVGVhbUlkIjoiMTUwMTIiLCJjcmVhdG9ySWQiOiIxMDg5MSIsImlhdCI6MTY5OTI5MzEyMCwiZXhwIjo0Nzc4NTg5MTIwfQ.wgiyViq5tryw8YiPDx8Lx4p5ppZsEx17JYZehoFXM2RNXPODxYPSAaiV571NZumQqa-uTLWyVc5R0kBhM4f1Pg',
        },
    })

    const data: Schemas = await res.json()
    console.log(`${dockUrl}/schemas:`, data)
    return NextResponse.json({ data })
}