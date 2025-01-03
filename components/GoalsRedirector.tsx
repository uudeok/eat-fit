'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';
import { LoadingAnimation } from './common';
import { useEffect } from 'react';

const GoalsRedirector = () => {
    const router = useRouter();
    const { data: goalData, isFetching } = useFetchGoalsByStatus('progress');

    useEffect(() => {
        if (isFetching) return;

        if (goalData && !isFetching) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [goalData, isFetching]);

    return (
        isFetching && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
                <LoadingAnimation />
            </div>
        )
    );
};

export default GoalsRedirector;
