import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMealsArgs } from '../@types';
import { createMeals } from '../supabase/mealsService';
import { dailySpecKeys, mealsKeys } from '../queryKey';

export function useCreateMeals(selectedDate: Date) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealData: CreateMealsArgs) => createMeals(mealData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error creating DailySpec:', error);
        },
    });
}

/* 선택한 날짜에 meals 데이터를 생성한다 -> 동일한 Key 무효화한다  */
/* dailySpec & meals join 데이터에도 마찬가지로 무효화 시켜준다 */
