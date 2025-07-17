'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GoalRedirect = () => {
    const router = useRouter();
    const { data: goalData, isLoading } = useFetchGoalsByStatus('progress');

    useEffect(() => {
        if (isLoading) return;

        if (goalData) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [isLoading, goalData]);

    return null;
};

export default GoalRedirect;
