'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingAnimation } from './common';

const GoalsRedirector = () => {
    const router = useRouter();
    const { data: goalData, isFetching } = useFetchGoalsByStatus('progress');

    useEffect(() => {
        if (goalData && !isFetching) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [goalData]);

    return (
        isFetching && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
                <LoadingAnimation />
            </div>
        )
    );
};

export default GoalsRedirector;
