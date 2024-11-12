import { foodDataFetch } from '@/service/utils/foodDataFetch';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const apiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY;
    const serviceId = process.env.NEXT_PUBLIC_FOOD_SERVICE_ID;

    const startIdx = searchParams.get('startIdx') || '1';
    const endIdx = searchParams.get('endIdx') || '5';
    const keyword = searchParams.get('DESC_KOR') || '';

    try {
        const result = await foodDataFetch(`/${apiKey}/${serviceId}/json/${startIdx}/${endIdx}/DESC_KOR=${keyword}`);

        const data = await result.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error Fetch Food Data', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
