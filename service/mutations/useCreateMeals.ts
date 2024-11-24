import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateMealsArgs } from '../@types';
import { createMeals } from '../api/mealsService';
import { dailySpecKeys, mealsKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';

export function useCreateMeals(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealData: CreateMealsArgs) => createMeals(mealData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success('저장되었습니다😆', { position: 'bottom-left' });
        },
        onError: (error) => {
            console.error('Error creating meals :', error);
        },
    });
}
