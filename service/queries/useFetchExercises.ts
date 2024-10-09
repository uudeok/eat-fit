import { useQuery } from '@tanstack/react-query';
import { exercisesKeys } from '../queryKey';
import { fetchExercisesData } from '../supabase/exercisesService';

const staleTIme = 5 * 60 * 1000; // 5분 동안 캐시된 데이터 사용
const gcTime = 10 * 60 * 1000; // 10분 동안 캐시 유지

export const useFetchExercises = (selectedDate: string) => {
    return useQuery({
        queryKey: exercisesKeys.date(selectedDate),
        queryFn: () => fetchExercisesData(selectedDate),
        staleTime: staleTIme,
        gcTime: gcTime,
    });
};
