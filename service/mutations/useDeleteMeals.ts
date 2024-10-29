import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, mealsKeys } from '../queryKey';
import { deleteMeals } from '../api/mealsService';

export function useDeleteMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealId: number) => deleteMeals(mealId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
            // queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error deleting meals:', error);
        },
    });
}
