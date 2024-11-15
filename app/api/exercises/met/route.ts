import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/utils/supabase/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);

    const keyword = searchParams.get('keyword');

    try {
        const { data } = await supabase.from('met').select('*').ilike('exercise_name', `%${keyword}%`).throwOnError();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching MET data : ', error);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
