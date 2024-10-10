import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { getGoalsData } from '@/app/(goals)/goals/page';

export const revalidate = 0;

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
