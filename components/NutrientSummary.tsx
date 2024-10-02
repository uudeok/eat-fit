'use client';

import styles from '@styles/component/nutrientSummary.module.css';
import { List, Text, ProgressBar, CircleText, ListCol } from './common';
import { NutrientsType, calculateTotalNutrients } from '@/shared/utils';
import { GoalType, MealType } from '@/service/@types/res.type';
import { useEffect, useMemo, useState } from 'react';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailyStep } from '@/service/queries/useFetchDailyStep';
import { MealItemType } from '@/service/@types';
import { CALORIES_PER_GRAM } from '@/constants';

const NutrientSummary = ({ goalData }: { goalData: GoalType }) => {
    const [nutrients, setNutrients] = useState<NutrientsType | null>();
    const { selectedDate } = useCalendarStore();
    const { data: dailyData } = useFetchDailyStep(selectedDate);

    const meals = useMemo(() => dailyData?.meals.map((data: MealType) => data.meal).flat(), [dailyData, selectedDate]);

    useEffect(() => {
        if (meals && meals.length > 0) {
            const nutrientsTotals = calculateTotalNutrients(meals as MealItemType[]);
            setNutrients(nutrientsTotals);
        } else {
            setNutrients(null);
        }
    }, [meals, selectedDate]);

    const NUTRIENTS = [
        {
            label: '탄',
            value: nutrients?.carbohydrate || 0,
            bgColor: 'var(--mainColorDk)',
            standard: goalData.daily_carb * CALORIES_PER_GRAM.CARBOHYDRATE,
        },
        {
            label: '단',
            value: nutrients?.protein || 0,
            bgColor: 'var(--orange300)',
            standard: goalData.daily_protein * CALORIES_PER_GRAM.PROTEIN,
        },
        {
            label: '지',
            value: nutrients?.fat || 0,
            bgColor: 'var(--red300)',
            standard: goalData.daily_fat * CALORIES_PER_GRAM.FAT,
        },
    ] as const;

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
                    <ListCol
                        className={styles.nutrientItem}
                        key={nutrient.label}
                        top={
                            <div className={styles.nutrient}>
                                <CircleText text={nutrient.label} size={22} background={nutrient.bgColor} />
                                <ProgressBar current={nutrient.value} total={nutrient.standard} size="xsm" />
                            </div>
                        }
                        bottom={
                            <Text color="white" bold size="lg">
                                {nutrient.value} / {nutrient.standard} g
                            </Text>
                        }
                    />
                ))}
            </div>
        </>
    );
};

export default NutrientSummary;
