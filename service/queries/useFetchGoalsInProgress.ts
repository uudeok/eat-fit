import { useQuery } from '@tanstack/react-query';
import { fetchGoalsInprogress } from '../supabase/goalsService';
import { goalsKeys } from '../queryKey';

const staleTIme = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchGoalInProgress = () => {
    return useQuery({
        queryKey: goalsKeys.status('progress'),
        queryFn: () => fetchGoalsInprogress(),
        staleTime: staleTIme,
        gcTime: gcTime,
    });
};