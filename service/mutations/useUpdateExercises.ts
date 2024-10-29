import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateExercisesArgs } from '../@types';
import { dailySpecKeys, exercisesKeys } from '../queryKey';
import { updateExercises } from '../api/exercisesService';

export function useUpdateExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateExercisesArgs) => updateExercises(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error updating Exercises Data:', error);
        },
    });
}
