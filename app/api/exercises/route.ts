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
            .from('exercises')
            .select('*')
            .eq('entry_date', selectedDate)
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching exercises data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json();
        const { daily_id, entry_date, exercise } = body;

        if (!daily_id || !entry_date || !exercise) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('exercises')
            .insert([{ daily_id, entry_date, exercise }])
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Error creating Exercises:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createClient();
    const { photo_url, id, exercise } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('exercises')
            .update({
                exercise,
                photo_url: photo_url || null,
            })
            .eq('id', id)
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error updating exercises:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
