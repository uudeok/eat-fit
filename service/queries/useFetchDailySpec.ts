import { useQuery } from '@tanstack/react-query';
import { dailySpecKeys } from '../queryKey';
import { fetchDailySpec } from '../supabase/dailyService';

const staleTIme = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchDailySpec = (selectedDate: string) => {
    return useQuery({
        queryKey: dailySpecKeys.date(selectedDate),
        queryFn: () => fetchDailySpec(selectedDate),
        staleTime: staleTIme,
        gcTime: gcTime,
    });
};
