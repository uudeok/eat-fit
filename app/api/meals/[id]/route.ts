import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/shared/utils/supabase/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClient();

    const mealId = parseInt(params.id);

    if (!mealId) {
        return NextResponse.json({ error: 'ID is required for deletion' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase.from('meals').select('*').eq('id', mealId).maybeSingle();

        if (error || !data) {
            return NextResponse.json({ error: 'Meal not found or an error occurred' }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching meal details:', error);
        return NextResponse.json({ error: 'Failed to fetch meal details' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClient();
    const mealId = parseInt(params.id);

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
