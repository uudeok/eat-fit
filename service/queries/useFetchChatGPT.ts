import { useQuery } from '@tanstack/react-query';
import { chatGPTKeys } from '../queryKey';
import { CreateGPTType, fetchGPTAnalysis } from '@/shared/utils/api/chatGPT';
import { getNextSundayMidnight } from '@/shared/utils';

const oneDay = 60 * 60 * 24 * 1000;
const staleTime = getNextSundayMidnight() - Date.now();
const gcTime = staleTime + oneDay;

export const useFetchChatGPT = ({
    goalData,
    weeklyWeight,
    burnedCalories,
    calories,
    progressionRate,
}: CreateGPTType) => {
    return useQuery({
        queryKey: chatGPTKeys.analysis({ goalData, weeklyWeight, burnedCalories, calories, progressionRate }),
        queryFn: () => fetchGPTAnalysis({ goalData, weeklyWeight, burnedCalories, calories, progressionRate }),
        staleTime: staleTime,
        gcTime: gcTime,
    });
};
