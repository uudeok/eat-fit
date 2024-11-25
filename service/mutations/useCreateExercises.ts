import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateExercisesArgs } from '../@types';
import { createExercises } from '../api/exercisesService';
import { dailySpecKeys, exercisesKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useCreateExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (exercisesData: CreateExercisesArgs) => createExercises(exercisesData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });

            toastNotify.success(TOAST_MESSAGES.SUCCESS);
        },
        onError: (error) => {
            console.error('Error creating Exercises :', error);

            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
