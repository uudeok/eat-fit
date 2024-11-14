import { foodDataFetch } from '@/service/utils/foodDataFetch';
import { NextResponse } from 'next/server';

const defaultStartIdx = 1;
const defaultEndIdx = 10;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const apiKey = process.env.NEXT_PUBLIC_FOOD_API_KEY;
    const serviceId = process.env.NEXT_PUBLIC_FOOD_SERVICE_ID;

    const startIdx = searchParams.get('startIdx') || defaultStartIdx;
    const endIdx = searchParams.get('endIdx') || defaultEndIdx;
    const keyword = searchParams.get('DESC_KOR') || '';

    try {
        const result = await foodDataFetch(`/${apiKey}/${serviceId}/json/${startIdx}/${endIdx}/DESC_KOR=${keyword}`);

        console.log(123456778, result);
        console.log('@@@', result.headers.get('content-type'));
        console.log('@@@@', result.headers);

        const data = await result.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error Fetch Food Data', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
