import { useQuery } from '@tanstack/react-query';
import { GoalRegisterType, GoalStatusType } from '../@types';
import { fetchGoalsInprogress } from '../supabase/goalsService';

export const goalsKeys = {
    base: [{ scope: 'goals' }] as const,
    all: () => [{ ...goalsKeys.base[0] }] as const,
    status: (status: GoalStatusType) => [{ ...goalsKeys.base[0], entity: 'status', status }] as const,
    details: (id: number) => [{ ...goalsKeys.base[0], entity: 'details', id }] as const,
};

export const useFetchGoalInProgress = () => {
    return useQuery({
        queryKey: goalsKeys.status('progress'),
        queryFn: () => fetchGoalsInprogress(),
    });
};

// export const useFetchGoalInProgress = () => {
//     return useQuery({
//         queryKey: goalsKeys.status('progress'),
//         queryFn: () => fetchGoalsInprogress(),
//         // staleTime: 1000 * 60 * 10,
//         // gcTime: 1000 * 60 * 20,
//     });
// };
