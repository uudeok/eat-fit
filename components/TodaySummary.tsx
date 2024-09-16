'use client';

import styles from '@styles/component/todaySummary.module.css';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import NutrientSummary from './NutrientSummary';
import TodayStatus from './TodayStatus';

const TodaySummary = () => {
    const { selectedDate } = useCalendarStore();
    /* goal_id, user_id, entry_date  로 daily 테이블 조회 */
    /* daily_id 로 meal, exercise 테이블 조회  */
    /* 해당 entry_date 에 섭취 칼로리, 탄단지 계산해서 그리기  */

    return (
        <div className={styles.layout}>
            <NutrientSummary />

            <TodayStatus />
        </div>
    );
};

export default TodaySummary;
