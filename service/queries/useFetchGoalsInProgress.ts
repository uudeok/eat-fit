import { useQuery } from '@tanstack/react-query';
import { fetchGoalsInprogress } from '../supabase/goalsService';
import { goalsKeys } from '../queryKey';

export const useFetchGoalInProgress = () => {
    return useQuery({
        queryKey: goalsKeys.status('progress'),
        queryFn: () => fetchGoalsInprogress(),
    });
};
