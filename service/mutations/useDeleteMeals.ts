import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, mealsKeys } from '../utils/queryKey';
import { deleteMeals } from '../api/mealsApi';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useDeleteMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealId: number) => deleteMeals(mealId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error deleting meals:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
