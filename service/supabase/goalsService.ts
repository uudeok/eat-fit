import { GoalRegisterType, GoalStatusType } from '@/service/@types/req.type';
import { createClient } from '@/shared/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const client = createClient();

/** select : fetch, insert : create,  delete : delete,  put : update   */

export async function fetchGoalsByStatus(status: GoalStatusType) {
    const { data } = await client.from('goals').select('*').eq('goal_status', status).throwOnError();

    return data;
}

// export async function fetchGoalsInprogress(fetch?: SupabaseClient) {
//     const supabase = fetch || client;

//     const { data, error } = await supabase.from('goals').select('*').eq('goal_status', 'progress');

//     if (error) {
//         throw new Error(error.message);
//     }

//     return data;
// }

export async function createNewGoals(goalData: GoalRegisterType) {
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
        .throwOnError();

    return data;
}

export async function fetchGoalsInprogress(fetch?: SupabaseClient) {
    const supabase = fetch || client;

    return await supabase.from('goals').select('*').eq('goal_status', 'progress');
}
