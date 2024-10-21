import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateExercisesArgs } from '../@types';
import { createExercises } from '../supabase/exercisesService';
import { dailySpecKeys, exercisesKeys } from '../queryKey';

export function useCreateExercises(selectedDate: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (exercisesData: CreateExercisesArgs) => createExercises(exercisesData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: exercisesKeys.date(selectedDate) });
            queryClient.invalidateQueries({ queryKey: dailySpecKeys.base });
        },
        onError: (error) => {
            console.error('Error creating Exercises :', error);
        },
    });
}
