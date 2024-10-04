import { useQuery } from '@tanstack/react-query';
import { mealsKeys } from '../queryKey';
import { fetchMealsData } from '../supabase/mealsService';

const staleTIme = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchMeals = (selectedDate: Date) => {
    return useQuery({
        queryKey: mealsKeys.date(selectedDate),
        queryFn: () => fetchMealsData(selectedDate),
        staleTime: staleTIme,
        gcTime: gcTime,
    });
};
