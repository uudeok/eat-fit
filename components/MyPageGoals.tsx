'use client';

import styles from '@styles/component/myPageGoals.module.css';
import { ListCol, Text } from './common';
import { GoalType } from '@/service/@types/res.type';
import { MEAL_PLAN } from '@/constants';

const MyPageGoals = ({ goalData }: { goalData: GoalType }) => {
    console.log(goalData);

    return (
        <div>
            <ListCol top={<Text>목표 몸무게</Text>} bottom={<Text>{goalData.target_weight}</Text>} />
            <ListCol top={<Text>D-day</Text>} bottom={<Text>{goalData.target_weight}</Text>} />
            <ListCol top={<Text>목표변경</Text>} bottom={<Text>{MEAL_PLAN[goalData.meal_plan]}</Text>} />
        </div>
    );
};

export default MyPageGoals;
