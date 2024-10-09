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
        const { data, error } = await supabase.from('meals').select('*').eq('entry_date', selectedDate);

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching meals data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json(); // 요청의 body를 JSON으로 파싱
        const { daily_id, entry_date, meal_type, meal } = body;

        if (!daily_id || !entry_date || !meal_type || !meal) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('meals')
            .insert([{ daily_id, entry_date, meal_type, meal }])
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Error creating meal:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const supabase = createClient();
    const { meal_type, serving_time, meal, photo_url, id } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('meals')
            .update({
                meal_type,
                serving_time: serving_time ? serving_time : null,
                meal,
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
        console.error('Error updating meal:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const supabase = createClient();

    const { mealId } = await request.json();

    if (!mealId) {
        return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase.from('meals').delete().eq('id', mealId).select();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json({ message: 'Meal deleted successfully', data }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting meal :', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
