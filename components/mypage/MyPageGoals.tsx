'use client';

import styles from '@styles/component/myPageGoals.module.css';
import { List, ListCol, Text } from '../common';
import { GoalType } from '@/service/@types/res.type';
import { MEAL_PLAN } from '@/constants';
import { calculateDDay } from '@/shared/utils';
import Icons from '@/assets';

const MyPageGoals = ({ goalData }: { goalData: GoalType }) => {
    const dDay = calculateDDay(goalData.goal_end_date);

    const GOALS = [
        { label: '목표 몸무게', value: goalData.target_weight, unit: 'kg' },
        { label: 'D-day', value: dDay, unit: '일', icon: <Icons.Flag width={15} /> },
        {
            label: '목표변경',
            value: MEAL_PLAN[goalData.meal_plan],
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
