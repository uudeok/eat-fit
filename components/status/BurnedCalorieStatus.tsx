'use client';

import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { ListRow, Penel, Text } from '../common';
import { useFetchExercises } from '@/service/queries';
import { calculateExercisesTotals } from '@/shared/utils';
import { useEffect, useState } from 'react';

const BurnedCalorieStatus = () => {
    const [burnedCalories, setBurnedCalories] = useState<number>(0);
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: exercisesData } = useFetchExercises(formattedDate);

    useEffect(() => {
        if (exercisesData) {
            const exercisesTotals = calculateExercisesTotals(exercisesData.exercise);
            setBurnedCalories(exercisesTotals.calories_burned);
        } else {
            setBurnedCalories(0);
        }
    }, [exercisesData]);

    return (
        <Penel direction="column" backgroundColor="var(--mainColorLg)">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        소모한 칼로리
                    </Text>
                }
                right={
                    <Text color="white" bold size="xlg">
                        {burnedCalories} Kcal
                    </Text>
                }
            />
        </Penel>
    );
};

export default BurnedCalorieStatus;
