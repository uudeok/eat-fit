import { useQueries, useQuery } from '@tanstack/react-query';
import { dailySpecKeys } from '../queryKey';
import { fetchDailyStep } from '../supabase/dailyService';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

const today = dayjs().format('YYYY-MM-DD');

const staleTIme = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchDailyStep = (selectedDate: string) => {
    return useQuery({
        queryKey: dailySpecKeys.withDetails(selectedDate),
        queryFn: () => fetchDailyStep(selectedDate),
        staleTime: staleTIme,
        gcTime: gcTime,
    });
};

export const useFetchDailySteps = (selectedDates: string[]) => {
    return useQueries({
        queries: selectedDates.map((selectedDate) => ({
            queryKey: dailySpecKeys.withDetails(selectedDate),
            queryFn: () => fetchDailyStep(selectedDate),
            enabled: dayjs(selectedDate).isSameOrBefore(today),
        })),
    });
};
