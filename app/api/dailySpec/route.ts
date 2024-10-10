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
            .select('*')
            .eq('entry_date', selectedDate)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching dailySpec data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json();
        const { goal_id, entry_date, today_weight, mood } = body;

        if (!goal_id || !entry_date) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('dailySpec')
            .insert([{ goal_id, entry_date, today_weight, mood }])
            .select()
            .throwOnError()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error creating dailySpec:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createClient();
    const { id, today_weight, mood } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('dailySpec')
            .update({
                mood,
                today_weight,
            })
            .eq('id', id)
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error updating dailySpec:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
