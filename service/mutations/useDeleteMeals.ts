import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, mealsKeys } from '../queryKey';
import { deleteMeals } from '../supabase/mealsService';

export function useDeleteMeals(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealId: number) => deleteMeals(mealId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error deleting meals:', error);
        },
    });
}
