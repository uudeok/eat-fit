'use client';

import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { useFetchGoalsByStatus } from '@/service/queries';

const TodaySummary = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');

    if (!goalData) return;

    return (
        <div className='p-5 flex flex-col gap-4 bg-mainColor shadow-md"'>
            <NutrientSummary goalData={goalData} />
            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
