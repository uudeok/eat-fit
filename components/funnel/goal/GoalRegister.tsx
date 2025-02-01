'use client';

import { LoadingAnimation } from '@/components/common';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import { useCreateGoal } from '@/service/mutations';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useGoalSotre } from '@/shared/store/useGoalStore';

const GoalRegister = () => {
    const router = useRouter();
    const { data: registerData } = useGoalSotre();

    const { mutate: createGoal } = useCreateGoal();

    const submitGoalData = useCallback(() => {
        if (!registerData) return;

        try {
            const createData = encodeCreateGoal({ ...registerData });
            createGoal({ ...createData });
            router.push('/home');
        } catch (err) {
            console.error('Error creating goal:', err);
            throw err;
        }
    }, [createGoal, registerData, router]);

    useEffect(() => {
        submitGoalData();
    }, [submitGoalData]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
            <LoadingAnimation />
        </div>
    );
};

export default GoalRegister;
