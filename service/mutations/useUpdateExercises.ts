import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateExercisesArgs } from '../@types';
import { dailySpecKeys, exercisesKeys } from '../utils/queryKey';
import { updateExercises } from '../api/exercisesApi';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useUpdateExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateExercisesArgs) => updateExercises(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error updating Exercises Data:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
