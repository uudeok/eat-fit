import { NextResponse } from 'next/server';
import { createClient } from '@/shared/utils/supabase/server';

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const supabase = createClient();

    try {
        const mealId = Number(params.id);

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
