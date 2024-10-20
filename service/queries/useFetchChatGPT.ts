import { useQuery } from '@tanstack/react-query';
import { chatGPTKeys } from '../queryKey';
import { CallGPTType, fetchGPTAnalysis } from '@/shared/utils/api/chatGPT';

const staleTime = 7 * 24 * 60 * 60 * 1000; // 7일 동안 캐시된 데이터 사용
const gcTime = 7 * 24 * 60 * 60 * 1000; // 7일 동안 캐시 유지

export const useFetchChatGPT = ({ goalData, weeklyWeight, burnedCalories, calories, progressionRate }: CallGPTType) => {
    return useQuery({
        queryKey: chatGPTKeys.base,
        queryFn: () => fetchGPTAnalysis({ goalData, weeklyWeight, burnedCalories, calories, progressionRate }),
        staleTime: staleTime,
        gcTime: gcTime,
    });
};
