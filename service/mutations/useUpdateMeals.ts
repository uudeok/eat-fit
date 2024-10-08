import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateMealsArgs } from '../@types';
import { updateMeals } from '../supabase/mealsService';
import { mealsKeys } from '../queryKey';

export function useUpdateMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateMealsArgs) => updateMeals(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
        },
        onError: (error) => {
            console.error('Error updating Meals Data:', error);
        },
    });
}
