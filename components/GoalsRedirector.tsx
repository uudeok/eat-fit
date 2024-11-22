'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';
import { Spinner } from './common';
import { useEffect } from 'react';

const GoalsRedirector = () => {
    const router = useRouter();
    const { data: goalData, isFetching } = useFetchGoalsByStatus('progress');

    useEffect(() => {
        if (goalData) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [goalData]);

    return isFetching && <Spinner />;
};

export default GoalsRedirector;
