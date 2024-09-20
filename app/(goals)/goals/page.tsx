'use client';

import { useGoalsByStatus } from '@/hooks/queries/useGoalsQuery';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const Goals = () => {
    const { session } = useContext(AuthContext);
    const router = useRouter();

    const { data } = useGoalsByStatus(session?.user.id!, 'progress');

    useEffect(() => {
        if (data?.length) {
            router.push('/home');
        } else {
            router.push('/goals/register');
        }
    }, [data, router]);

    return <p>Loading...</p>;
};

export default Goals;
