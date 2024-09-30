import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { getGoalsData } from '@/app/(goals)/goals/page';

const TodaySummary = async () => {
    const goalData = await getGoalsData();

    if (!goalData) {
        throw new Error('목표 설정이 되지 않았습니다');
    }

    return (
        <div className='p-5 h-[350px] flex flex-col gap-4 bg-mainColor shadow-md"'>
            <NutrientSummary goalData={goalData} />

            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
