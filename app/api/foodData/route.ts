import { foodDataFetch } from '@/service/utils/foodDataFetch';
import { NextResponse } from 'next/server';

const defaultPageNum = 1;
const defaultPageSize = 10;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const serviceKey = process.env.NEXT_PUBLIC_FOOD_SERVICE_KEY;
    const pageNum = searchParams.get('pageNum') || defaultPageNum;
    const pageSize = searchParams.get('pageSize') || defaultPageSize;
    const keyword = searchParams.get('keyword');

    if (!keyword) {
        return NextResponse.json({ error: 'Keyword parameter is missing' }, { status: 400 });
    }

    try {
        const result = await foodDataFetch(
            `?serviceKey=${serviceKey}&pageNo=${pageNum}&numOfRows=${pageSize}&type=json&FOOD_NM_KR=${keyword}`
        );

        const data = await result.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error Fetch Food Data', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
