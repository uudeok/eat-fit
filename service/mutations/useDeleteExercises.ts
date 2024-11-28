import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, exercisesKeys } from '../utils/queryKey';
import { deleteExercises } from '../api/exercisesService';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useDeleteExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (exercisesId: number) => deleteExercises(exercisesId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
            // queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error deleting exercises:', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
