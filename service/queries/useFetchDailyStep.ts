import { useQueries, useQuery } from '@tanstack/react-query';
import { dailySpecKeys } from '../queryKey';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { DATE_FORMAT } from '@/constants';
import { fetchDailyStep, fetchDailyStepsInRange } from '../supabase/stepService';
dayjs.extend(isSameOrBefore);

const today = dayjs().format(DATE_FORMAT['YYYY-MM-DD']);

const staleTime = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

/* 해당 날짜의 step 가져오기 */
export const useFetchDailyStep = (selectedDate: string) => {
    return useQuery({
        queryKey: dailySpecKeys.withDetails(selectedDate),
        queryFn: () => fetchDailyStep(selectedDate),
        staleTime: staleTime,
        gcTime: gcTime,
    });
};

/* 여러 날짜에 해당되는 steps 데이터 가져오기 */
export const useFetchDailySteps = (selectedDates: string[]) => {
    return useQueries({
        queries: selectedDates.map((selectedDate) => ({
            queryKey: dailySpecKeys.withDetails(selectedDate),
            queryFn: () => fetchDailyStep(selectedDate),
            enabled: dayjs(selectedDate).isSameOrBefore(today),
            staleTime: staleTime,
            gcTime: gcTime,
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            };
        },
    });
};

/* 특정 날짜 기간에 해당되는 steps 데이터 가져오기 */
export const useFetchDailyStepsInRange = (startDate: string, endDate: string) => {
    return useQuery({
        queryKey: dailySpecKeys.range(startDate, endDate),
        queryFn: () => fetchDailyStepsInRange(startDate, endDate),
        staleTime: staleTime,
        gcTime: gcTime,
    });
};
