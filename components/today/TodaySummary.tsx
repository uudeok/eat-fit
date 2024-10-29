import { GoalStatusType } from '@/service/@types';
import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { API_ENDPOINTS } from '@/service/api/config';
import { headers } from 'next/headers';

export const revalidate = 0;

const getGoalsData = async (status: GoalStatusType) => {
    const data = await fetch(`${API_ENDPOINTS.GOALS}?status=${status}`, {
        headers: headers(),
        cache: 'no-store',
    });

    const result = await data.json();
    return result;
};

const TodaySummary = async () => {
    const goalData = await getGoalsData('progress');

    if (!goalData) {
        throw new Error('목표 설정이 되지 않았습니다');
    }

    return (
        <div className='p-5 flex flex-col gap-4 bg-mainColor shadow-md"'>
            <NutrientSummary goalData={goalData} />

            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
