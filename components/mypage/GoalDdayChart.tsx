'use client';

import styles from '@styles/component/goalDdayProgress.module.css';
import { useFetchGoalsByStatus } from '@/service/queries';
import { ListRow, ProgressBar, Text } from '../common';
import dayjs from 'dayjs';
import { getDdayProgressMessage } from '@/shared/utils';
import { useEffect, useMemo } from 'react';
import { useReportStore } from '@/shared/store/useReportStore';

const GoalDdayChart = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { setProgressionRage } = useReportStore();

    const today = dayjs().toDate().getTime();
    const startDate = dayjs(goalData?.startDate).toDate().getTime();
    const endDate = dayjs(goalData?.endDate).toDate().getTime();

    const progressPercentage = useMemo(() => {
        const totalDuration = endDate - startDate;
        const elapsedDuration = today - startDate;

        const percentage = Math.min((elapsedDuration / totalDuration) * 100, 100);
        const roundedProgress = Math.round(percentage);

        return roundedProgress;
    }, [today, startDate, endDate]);

    useEffect(() => {
        setProgressionRage(progressPercentage);
    }, [progressPercentage]);

    return (
        <div className={styles.layout}>
            <div className={styles.title}>
                <Text color="white" bold size="xlg">
                    D-Day 까지 <strong>{progressPercentage || 0}%</strong> 진행했어요!
                </Text>
                <Text bold color="#4593fc">
                    {getDdayProgressMessage(progressPercentage)}
                </Text>
            </div>
            <ProgressBar current={progressPercentage || 0} total={100} size="sm" />
            <ListRow
                left={
                    <Text color="white" bold size="sm">
                        🚀 {goalData?.startDate}
                    </Text>
                }
                right={
                    <Text color="white" bold size="sm">
                        ⛳️ {goalData?.endDate}
                    </Text>
                }
            />
        </div>
    );
};

export default GoalDdayChart;
