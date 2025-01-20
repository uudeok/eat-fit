'use client';

import { LoadingAnimation } from '@/components/common';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import { useCreateGoal } from '@/service/mutations';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { goalStore } from './GoalStep';

const GoalRegister = () => {
    const router = useRouter();
    const { data: registerData } = goalStore();

    const { mutate: createGoal } = useCreateGoal();

    const submitGoalData = () => {
        if (!registerData) return;

        try {
            const createData = encodeCreateGoal({ ...registerData });
            createGoal({ ...createData });
            router.push('/home');
        } catch (err) {
            console.error('Error creating goal:', err);
            throw err;
        }
    };

    useEffect(() => {
        submitGoalData();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
            <LoadingAnimation />
        </div>
    );
};

export default GoalRegister;
