import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMealsArgs } from '../@types';
import { createMeals } from '../supabase/mealsService';
import { mealsKeys } from '../queryKey';

export function useCreateMeals(selectedDate: Date) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealData: CreateMealsArgs) => createMeals(mealData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.date(selectedDate) });
        },
        onError: (error) => {
            console.error('Error creating DailySpec:', error);
        },
    });
}
