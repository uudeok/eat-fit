import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    try {
        const { data, error } = await supabase.from('users').select('*').maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching users data:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
