'use client';

import { LoadingAnimation } from '@/components/common';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import { useCreateGoal } from '@/service/mutations';
import { FunnelContext } from '@/shared/context/FunnelProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const GoalRegister = () => {
    const router = useRouter();
    const { registerData } = useContext(FunnelContext);
    const { mutate: createGoal } = useCreateGoal();

    console.log('register : ', registerData);

    const submitGoalData = () => {
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
