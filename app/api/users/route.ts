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

export async function PUT(request: NextRequest) {
    const supabase = createClient();
    const { id, avatar_url, nickname, content } = await request.json();

    if (!id) {
        return NextResponse.json({ error: 'id is required for update' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('users')
            .update({
                avatar_url: avatar_url,
                nickname: nickname,
                content: content,
            })
            .eq('id', id)
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
