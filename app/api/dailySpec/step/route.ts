import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);

    const selectedDate = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = supabase.from('dailySpec').select(
        `
     *,
        meals (
            id,
            meal_type,
            serving_time,
            meal,
            photo_url               
        ),
        exercises (
            id, 
            photo_url,
            exercise
        )
    `
    );

    try {
        if (selectedDate) {
            query.eq('entry_date', selectedDate).maybeSingle();
        } else {
            query.gte('entry_date', startDate).lte('entry_date', endDate).order('entry_date', { ascending: true });
        }

        const { data, error } = await query.throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching dailyStep data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
