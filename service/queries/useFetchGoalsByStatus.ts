import { useQuery } from '@tanstack/react-query';
import { fetchGoalsByStatus } from '../api/goalsApi';
import { GoalStatusType } from '../@types';
import { goalsKeys } from '../utils/queryKey';

const staleTime = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchGoalsByStatus = (status: GoalStatusType) => {
    return useQuery({
        queryKey: goalsKeys.status(status),
        queryFn: () => fetchGoalsByStatus(status),
        staleTime: staleTime,
        gcTime: gcTime,
    });
};
