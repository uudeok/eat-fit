'use client';

import styles from '@styles/component/mealAddList.module.css';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { Badge, ListRow, Text } from './common';
import { Button } from './common/Button';
import { calculateTotalNutrients } from '@/shared/utils';
import { MEALS_TYPE, MealsKeysType } from '@/constants/meals';
import { useState } from 'react';
import Icons from '@/assets';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useRouter } from 'next/navigation';
import { useFetchDailySpec, useFetchGoalsByStatus } from '@/service/queries';
import { useCreateDailySpec, useCreateMeals } from '@/service/mutations';
import { DecodeMealItemType, encodeCreateMeal } from '@/service/mappers/mealsMapper';

const MealAddList = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.mealForm);
    const [selectedMealType, setSelectedMealType] = useState<MealsKeysType>('meal');

    const { meals, removeMeal, selectMeal, resetMeals } = useMealsStore();
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { data: dailySpec } = useFetchDailySpec(formattedDate);

    const { mutateAsync: createDailySpec } = useCreateDailySpec(formattedDate);
    const { mutateAsync: createMeals } = useCreateMeals(formattedDate);

    if (!meals.length) return;

    const nutrientTotals = calculateTotalNutrients(meals);

    const createMealsData = async (id?: number) => {
        const mealData = {
            dailyId: dailySpec?.id! || id!,
            entryDate: formattedDate,
            mealType: selectedMealType,
            mealItem: meals,
        };

        const createData = encodeCreateMeal({ ...mealData });

        await createMeals(createData);
        resetMeals();
        router.push('/home');
    };

    const submitMeals = async () => {
        if (!dailySpec) {
            const dailySpecData = {
                goal_id: goalData?.id!,
                entry_date: formattedDate,
                today_weight: 0,
                mood: null,
            };
            const dailyData = await createDailySpec(dailySpecData);

            createMealsData(dailyData.id);
        } else {
            createMealsData();
        }
    };

    const openMealDetail = (meal: DecodeMealItemType) => {
        selectMeal(meal);
        onOpen();
    };

    const addMealsItem = () => {
        selectMeal(null);
        onOpen();
    };

    return (
        <div className={styles.layout}>
            <ListRow
                left={<Text bold>식사 유형 (필수)</Text>}
                right={
                    <div className={styles.badgeContainer}>
                        {Object.entries(MEALS_TYPE).map(([key, label]) => (
                            <Badge
                                key={label}
                                onClick={() => setSelectedMealType(key as MealsKeysType)}
                                isSelected={selectedMealType === key}
                            >
                                {label}
                            </Badge>
                        ))}
                    </div>
                }
            />

            {meals.map((meal) => (
                <ListRow
                    onClick={() => openMealDetail(meal)}
                    className={styles.mealItem}
                    key={meal.id}
                    left={
                        <div className={styles.foodName}>
                            <Text bold size="lg">
                                {meal.foodName}
                            </Text>
                            <Text size="sm" color="var(--grey600)">
                                {meal.servingSize ? `${meal.servingSize}g` : '자유입력'}
                            </Text>
                        </div>
                    }
                    right={
                        <div className={styles.action}>
                            <Text bold size="lg">
                                {meal.calories || 0} kcal
                            </Text>
                            <Icons.FillXmark
                                width={13}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    removeMeal(meal.id);
                                }}
                            />
                        </div>
                    }
                />
            ))}

            <div className={styles.summary}>
                <ListRow
                    left={
                        <Text bold size="xlg">
                            {meals.length}개
                        </Text>
                    }
                    right={
                        <Text bold size="xlg">
                            {nutrientTotals.calories} kcal
                        </Text>
                    }
                />
            </div>

            <div className={styles.btn}>
                <Button role="round" size="lg" onClick={addMealsItem}>
                    + 추가하기
                </Button>
                <Button role="round" size="lg" onClick={submitMeals}>
                    저장하기
                </Button>
            </div>
        </div>
    );
};

export default MealAddList;
