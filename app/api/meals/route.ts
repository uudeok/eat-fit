import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const selectedDate = searchParams.get('date');

    console.log(1, selectedDate);

    if (!selectedDate) {
        return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    // 날짜를 ISO 형식으로 변환하고 UTC로 설정
    const dateObj = new Date(selectedDate).toISOString();

    console.log(2, dateObj);

    try {
        const { data, error } = await supabase.from('meals').select('*').eq('entry_date', dateObj);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching meals data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
