import { GoalStatusType } from '@/service/@types';
import { createClient } from '@/shared/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const supabase = createClient();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as GoalStatusType;

    if (!status) {
        return NextResponse.json({ error: 'Status Parameter is required' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('goal_status', status)
            .throwOnError()
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching goals data : ', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const supabase = createClient();

    try {
        const body = await request.json();

        const {
            gender,
            age,
            height,
            activity_level,
            weight,
            target_weight,
            daily_calories,
            goal_start_date,
            goal_end_date,
            goal_period,
            meal_plan,
            daily_carb,
            daily_protein,
            daily_fat,
        } = body;

        const { data, error } = await supabase
            .from('goals')
            .insert([
                {
                    gender,
                    age,
                    height,
                    activity_level,
                    weight,
                    target_weight,
                    daily_calories,
                    goal_start_date,
                    goal_end_date,
                    goal_period,
                    meal_plan,
                    daily_carb,
                    daily_protein,
                    daily_fat,
                },
            ])
            .select()
            .throwOnError();

        if (error) {
            throw new Error(error.message);
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Error creating goals:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
