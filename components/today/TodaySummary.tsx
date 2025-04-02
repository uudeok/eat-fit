'use client';

import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { useFetchGoalsByStatus } from '@/service/queries';
import { useRouter } from 'next/navigation';

const TodaySummary = () => {
    const router = useRouter();
    const { data: goalData } = useFetchGoalsByStatus('progress');

    if (!goalData) {
        alert('목표 설정이 되지 않았습니다');
        router.push('/goals/register');
        return;
    }

    return (
        <div className='p-5 flex flex-col gap-4 bg-mainColor shadow-md"'>
            <NutrientSummary goalData={goalData} />
            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
