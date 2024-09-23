'use client';

import { Spinner } from '@/components/common';
import { useGoalsByStatus } from '@/hooks/queries/useGoalsQuery';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const Goals = () => {
    const router = useRouter();
    const { session } = useContext(AuthContext);
    const { data, isLoading } = useGoalsByStatus(session?.user.id!, 'progress');

    useEffect(() => {
        if (data?.length) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [data, router]);

    return <>{isLoading && <Spinner />}</>;
};

export default Goals;
