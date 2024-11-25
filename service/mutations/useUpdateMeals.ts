import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateMealsArgs } from '../@types';
import { updateMeals } from '../api/mealsService';
import { dailySpecKeys, mealsKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useUpdateMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateMealsArgs) => updateMeals(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error updating Meals Data:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
