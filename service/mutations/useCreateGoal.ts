import { GoalRegisterType } from '@/service/@types';
import { createNewGoals } from '@/service/supabase/goalsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateGoal() {
    return useMutation({
        mutationFn: (goalData: GoalRegisterType) => createNewGoals(goalData),
        onSuccess: (data) => {},
        onError: (error) => {
            console.error('Error creating goal:', error);
        },
    });
}
