import { GoalRegisterType, GoalStatusType } from '@/service/@types/req.type';
import { createClient } from '@/shared/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

const client = createClient();

export function fetchGoalsByStatus(user_id: string, status: GoalStatusType) {
    return client.from('goals').select(`id`).eq('user_id', user_id).eq('goal_status', status).throwOnError();
}

// export function insertGoalData( goalData : GoalRegisterType)  {
//     return client.from('goals').insert([goalData])
// }
