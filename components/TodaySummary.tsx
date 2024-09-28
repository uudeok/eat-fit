import styles from '@styles/component/todaySummary.module.css';
import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';
import { getGoalsData } from '@/app/(goals)/goals/page';

const TodaySummary = async () => {
    const goalData = await getGoalsData();

    if (!goalData) {
        throw new Error('목표 설정이 되지 않았습니다');
    }

    return (
        <div className={styles.layout}>
            <NutrientSummary initialData={goalData} />

            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
