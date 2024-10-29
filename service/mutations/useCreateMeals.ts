import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMealsArgs } from '../@types';
import { createMeals } from '../supabase/mealsService';
import { dailySpecKeys, mealsKeys } from '../queryKey';

export function useCreateMeals(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealData: CreateMealsArgs) => createMeals(mealData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
            // queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error creating meals :', error);
        },
    });
}
