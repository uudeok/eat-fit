import { GoalStatusType, GoalsType } from '@/service/@types/req.type';
import { SupabaseClient } from '@supabase/supabase-js';

export function fetchGoalsByStatus(client: SupabaseClient, user_id: string, status: GoalStatusType) {
    return client.from('goals').select(`id`).eq('user_id', user_id).eq('goal_status', status).throwOnError();
}
