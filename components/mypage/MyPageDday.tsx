'use client';

import styles from '@styles/component/mypageDday.module.css';
import { GoalType } from '@/service/@types';
import CircleProgressBar from '../common/CircleProgressBar';

const MyPageDday = ({ goalData }: { goalData: GoalType }) => {
    const { goal_start_date, goal_end_date, goal_period } = goalData;

    const startDate = new Date(goal_start_date);
    const endDate = new Date(goal_end_date);
    const today = new Date();

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const elapsedDays = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    const progressPercentage = Math.min((elapsedDays / totalDays) * 100, 100); // 100% 초과 방지

    return (
        <div className={styles.layout}>
            <CircleProgressBar current={progressPercentage} total={totalDays} size="xlg" />
        </div>
    );
};

export default MyPageDday;
