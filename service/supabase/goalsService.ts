import { GoalRegisterType, GoalStatusType } from '@/service/@types/req.type';
import { createClient } from '@/shared/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { GoalType } from '../@types/res.type';

const client = createClient();

export async function fetchGoalsByStatus(status: GoalStatusType) {
    const { data } = await client.from('goals').select('*').eq('goal_status', status).throwOnError();

    return data;
}

export async function fetchGoalsInprogress(fetch?: SupabaseClient): Promise<GoalType | null> {
    const supabase = fetch || client;

    const { data } = await supabase
        .from('goals')
        .select('*')
        .eq('goal_status', 'progress')
        .throwOnError()
        .maybeSingle();

    return data;
}

export async function createNewGoals(goalData: GoalRegisterType): Promise<GoalType | null> {
    const { data } = await client
        .from('goals')
        .insert([
            {
                gender: goalData.gender,
                age: goalData.age,
                height: goalData.height,
                activity_level: goalData.activity_level,
                weight: goalData.weight,
                target_weight: goalData.target_weight,
                daily_calories: goalData.daily_calories,
                goal_start_date: goalData.goal_start_date.toISOString(),
                goal_end_date: goalData.goal_end_date.toISOString(),
                goal_period: goalData.goal_period,
                meal_plan: goalData.meal_plan,
                daily_carb: goalData.daily_carb,
                daily_protein: goalData.daily_protein,
                daily_fat: goalData.daily_fat,
            },
        ])
        .select()
        .throwOnError()
        .maybeSingle();

    return data;
}
