import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, mealsKeys } from '../utils/queryKey';
import { deleteMeals } from '../api/mealsService';
import toastNotify from '@/shared/utils/toast';

export function useDeleteMeals() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mealId: number) => deleteMeals(mealId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: mealsKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success('삭제되었습니다 🌟', { position: 'bottom-right' });
        },
        onError: (error) => {
            console.error('Error deleting meals:', error);
            toastNotify.error('잠시 후 다시 시도해주세요', { position: 'bottom-left', theme: 'colored' });
        },
    });
}
