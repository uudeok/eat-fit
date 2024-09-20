import { GoalStatusType } from '@/service/@types/req.type';
import { fetchGoalsByStatus } from '@/service/supabase/goalsService';
import { createClient } from '@/shared/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';

const client = createClient();

export function useGoalsByStatus(userId: string, status: GoalStatusType) {
    const queryKey = ['goalsByStatus', userId, status];

    const queryFn = async () => {
        return fetchGoalsByStatus(client, userId, status).then((result) => result.data);
    };

    return useQuery({ queryKey, queryFn });
}
