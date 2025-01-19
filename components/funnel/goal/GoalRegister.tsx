'use client';

import { LoadingAnimation } from '@/components/common';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import { useCreateGoal } from '@/service/mutations';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useGoalStore } from './GoalStep';
import { useFunnelContext } from '@/shared/context/FunnelProvider';
import { GoalRegisterType } from '@/service/@types';

const GoalRegister = () => {
    const router = useRouter();
    // const { data } = useGoalStore();
    const { registerData: data } = useFunnelContext<GoalRegisterType>();

    const { mutate: createGoal } = useCreateGoal();

    const submitGoalData = () => {
        if (!data) return;

        try {
            const createData = encodeCreateGoal({ ...data });
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
