import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const selectedDate = searchParams.get('date');

    if (!selectedDate) {
        return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('dailySpec')
            .select(
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
            )
            .eq('entry_date', selectedDate)
            .throwOnError()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching dailyStep data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
