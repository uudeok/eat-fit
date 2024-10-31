import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateMealsArgs } from '../@types';
import { updateMeals } from '../api/mealsService';
import { dailySpecKeys, mealsKeys } from '../utils/queryKey';

export function useUpdateMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateMealsArgs) => updateMeals(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
            // queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error updating Meals Data:', error);
        },
    });
}
