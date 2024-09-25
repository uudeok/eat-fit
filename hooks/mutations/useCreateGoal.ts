import { useMutation } from '@tanstack/react-query';
import { GoalRegisterType } from '@/service/@types/req.type';
import { createNewGoals } from '@/service/supabase/goalsService';

export function useCreateGoal(goalData: GoalRegisterType) {
    const mutation = useMutation({
        mutationFn: async () => createNewGoals(goalData),
        onError: (error) => {
            console.error('API Error:', error);
            throw new Error('Failed to create goal');
        },
    });

    return {
        createGoal: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
    };
}
