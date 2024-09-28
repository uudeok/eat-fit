import { GoalRegisterType } from '@/service/@types';
import { createNewGoals } from '@/service/supabase/goalsService';
import { useMutation } from '@tanstack/react-query';

export function useCreateGoal() {
    return useMutation({
        mutationFn: (goalData: GoalRegisterType) => createNewGoals(goalData), // 목표 데이터를 인자로 받음
        onSuccess: (data) => {
            // 목표 생성 성공 시 실행되는 콜백
            console.log('Goal created successfully:', data);
        },
        onError: (error) => {
            // 목표 생성 실패 시 실행되는 콜백
            console.error('Error creating goal:', error);
        },
    });
}
