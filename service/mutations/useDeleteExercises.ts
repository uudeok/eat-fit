import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dailySpecKeys, exercisesKeys } from '../queryKey';
import { deleteExercises } from '../supabase/exercisesService';

export function useDeleteExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (exercisesId: number) => deleteExercises(exercisesId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.base });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.withDetails(selectedDate) });
        },
        onError: (error) => {
            console.error('Error deleting exercises:', error);
        },
    });
}
