'use client';

import styles from '@styles/component/nutrientSummary.module.css';
import { List, Text, ProgressBar, CircleText, ListCol } from '../common';
import { NutrientsType, calculateTotalNutrients } from '@/shared/utils';
import { GoalType } from '@/service/@types/res.type';
import { useEffect, useState } from 'react';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchMeals } from '@/service/queries';

const NutrientSummary = ({ goalData }: { goalData: GoalType }) => {
    const [nutrients, setNutrients] = useState<NutrientsType>({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });

    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: mealsData } = useFetchMeals(formattedDate);

    useEffect(() => {
        if (mealsData && mealsData.flatMealItem) {
            const nutrientsTotals = calculateTotalNutrients(mealsData.flatMealItem);
            setNutrients(nutrientsTotals);
        } else {
            setNutrients({ calories: 0, carbohydrate: 0, protein: 0, fat: 0 });
        }
    }, [mealsData]);

    const NUTRIENTS = [
        {
            label: '탄',
            value: nutrients?.carbohydrate,
            bgColor: 'var(--mainColorDk)',
            standard: goalData.daily_carb,
        },
        {
            label: '단',
            value: nutrients?.protein,
            bgColor: 'var(--orange300)',
            standard: goalData.daily_protein,
        },
        {
            label: '지',
            value: nutrients?.fat,
            bgColor: 'var(--red300)',
            standard: goalData.daily_fat,
        },
    ] as const;

    return (
        <>
            <List className={styles.calories}>
                <ListCol
                    top={
                        <Text size="xxlg" bold color="white">
                            {nutrients.calories} / {goalData.daily_calories} kcal
                        </Text>
                    }
                    bottom={<ProgressBar current={nutrients.calories} total={goalData.daily_calories} />}
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
