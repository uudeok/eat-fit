import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트를 서버에서 초기화
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function GET(request: NextRequest) {
    try {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('goal_status', 'progress')
            .throwOnError()
            .maybeSingle();

        // 오류가 발생하면 에러 메시지와 함께 500 상태 코드 반환
        if (error) {
            throw new Error(error.message);
        }

        // 성공적으로 데이터를 가져오면 JSON 형식으로 반환
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
