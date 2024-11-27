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
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
                <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: '#50CFD2' }}
                >
                    <Image
                        src="/images/loading.gif"
                        alt="loading"
                        width={100}
                        height={100}
                        priority
                        className="rounded-full"
                    />
                </div>
            </div>
        )
    );
};

export default GoalsRedirector;
