'use client';

import styles from '@styles/component/nutrientSummary.module.css';
import { List, Text, ProgressBar, ListRow, CircleText, ListCol } from './common';
import { NutrientsType, calculateTotalNutrients, setLocalStorageItem } from '@/shared/utils';
import { GoalType, MealsType } from '@/service/@types/res.type';
import { useEffect, useMemo, useState } from 'react';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailyStep } from '@/service/queries/useFetchDailyStep';
import { MealItemType } from '@/service/@types';

const NutrientSummary = ({ goalData }: { goalData: GoalType }) => {
    const [nutrients, setNutrients] = useState<NutrientsType | null>();
    const { selectedDate } = useCalendarStore();
    const { data: dailyData } = useFetchDailyStep(selectedDate);

    const meals = useMemo(() => dailyData?.meals.map((data: MealsType) => data.meal).flat(), [dailyData, selectedDate]);

    useEffect(() => {
        if (meals && meals.length > 0) {
            const nutrientsTotals = calculateTotalNutrients(meals as MealItemType[]);
            setNutrients(nutrientsTotals);
        } else {
            setNutrients(null);
        }
    }, [meals, selectedDate]);

    /* 서버에서 받아온 goalData 를 로컬스토리지에 저장/갱신  */
    useEffect(() => {
        setLocalStorageItem('goalData', goalData);
    }, [goalData]);

    const NUTRIENTS = [
        { label: '탄', value: nutrients?.carbohydrate || 0, bgColor: 'var(--mainColorDk)' },
        { label: '단', value: nutrients?.protein || 0, bgColor: 'var(--orange300)' },
        { label: '지', value: nutrients?.fat || 0, bgColor: 'var(--red300)' },
    ];

    return (
        <>
            <List className={styles.calories}>
                <ListCol
                    top={
                        <Text size="xxlg" bold color="white">
                            {nutrients?.calories || 0} / {goalData.daily_calories} kcal
                        </Text>
                    }
                    bottom={<ProgressBar current={450} total={goalData.daily_calories} />}
                />
            </List>

            <div className={styles.nutrients}>
                {NUTRIENTS.map((nutrient) => (
                    <ListRow
                        key={nutrient.label}
                        className={styles.nutrientItem}
                        left={<CircleText text={nutrient.label} size={24} background={nutrient.bgColor} />}
                        right={
                            <Text color="white" bold size="xlg">
                                {nutrient.value}g
                            </Text>
                        }
                    />
                ))}
            </div>
        </>
    );
};

export default NutrientSummary;
