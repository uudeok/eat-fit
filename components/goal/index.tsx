'use client';

import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';

const GoalRedirect = () => {
    const router = useRouter();

    const { data: goalData } = useFetchGoalsByStatus('progress');
    // const goalData = await getGoalsData('progress');

    if (goalData) {
        router.push('/home');
    } else {
        router.push('/goals/register');
    }

    return <></>;
};

export default GoalRedirect;
