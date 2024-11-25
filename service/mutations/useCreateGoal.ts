import { CreateGoalArgs } from '@/service/@types';
import { createNewGoals } from '@/service/api/goalsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goalsKeys } from '../utils/queryKey';
import toastNotify from '@/shared/utils/toast';
import { TOAST_MESSAGES } from '@/constants';

export function useCreateGoal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (goalData: CreateGoalArgs) => createNewGoals(goalData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: goalsKeys.base });
        },
        onError: (error) => {
            console.error('Error creating goal:', error);
            toastNotify.error(TOAST_MESSAGES.ERROR);
        },
    });
}
