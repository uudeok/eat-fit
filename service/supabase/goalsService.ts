import { GoalRegisterType, GoalStatusType } from '@/service/@types/req.type';
import { createClient } from '@/shared/utils/supabase/client';

const client = createClient();

export function fetchGoalsByStatus(user_id: string, status: GoalStatusType) {
    return client.from('goals').select(`id`).eq('user_id', user_id).eq('goal_status', status).throwOnError();
}

export function createNewGoals(goalData: GoalRegisterType) {
    return client
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
            },
        ])
        .select()
        .throwOnError();
}
