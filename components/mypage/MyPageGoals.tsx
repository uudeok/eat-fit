'use client';

import styles from '@styles/component/myPageGoals.module.css';
import { List, ListCol, Spinner, Text } from '../common';
import { MEAL_PLAN } from '@/constants';
import { calculateDDay } from '@/shared/utils';
import Icons from '@/assets';
import { useFetchGoalsByStatus } from '@/service/queries';

const MyPageGoals = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');

    if (!goalData) return <Spinner />;

    const dDay = calculateDDay(goalData.endDate);

    const GOALS = [
        { label: '목표 몸무게', value: goalData.targetWeight, unit: 'kg' },
        { label: 'D-day', value: dDay, unit: '일', icon: <Icons.Flag width={15} /> },
        {
            label: '식단',
            value: MEAL_PLAN[goalData.mealPlan],
            unit: '식단',
        },
    ];

    return (
        <div className={styles.layout}>
            {GOALS.map((goal, index) => (
                <List key={index} className={styles.goalItem}>
                    <ListCol
                        top={
                            <div>
                                <Text bold color="var(--grey700)">
                                    {goal.icon} {goal.label}
                                </Text>
                            </div>
                        }
                        bottom={
                            <Text bold color="var(--grey800)">
                                {goal.value} {goal.unit}
                            </Text>
                        }
                    />
                </List>
            ))}
        </div>
    );
};

export default MyPageGoals;
