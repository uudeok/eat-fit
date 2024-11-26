'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

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

    return (
        isFetching && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <Image src="/images/loading.gif" alt="loading" width={100} height={100} priority />
            </div>
        )
    );
};

export default GoalsRedirector;
