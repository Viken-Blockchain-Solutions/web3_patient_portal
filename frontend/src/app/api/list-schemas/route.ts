import { NextResponse, NextRequest } from 'next/server';
import type { SchemaDefinition as Schemas } from '@/types';
import 'dotenv/config';

const dockUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
const apiToken = process.env.NEXT_PUBLIC_TEST_API_TOKEN as string;

export async function GET(request: NextRequest) {
    const res = await fetch(`${dockUrl}/schemas`, {
        headers: {
            'Content-Type': 'application/json',
            'DOCK-API-TOKEN': apiToken,
        },
    })

    const data: Schemas = await res.json()
    //console.log(`${dockUrl}/schemas:`, data)
    console.log(`schemas:`, await data.length)
    return NextResponse.json({ data })
}