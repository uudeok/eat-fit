'use client';

import styles from '@styles/component/mealAddList.module.css';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { Badge, ListRow, Text } from './common';
import { Button } from './common/Button';
import { calculateTotalNutrients, getLocalStorageItem } from '@/shared/utils';
import { MEALS_TYPE, MealsKeysType } from '@/constants/meals';
import { useState } from 'react';
import Icons from '@/assets';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { MealItemType } from '@/service/@types';
import { useCreateMeals } from '@/service/mutations/useCreateMeals';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { useRouter } from 'next/navigation';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { DailySpecType, GoalType } from '@/service/@types/res.type';

const MealAddList = () => {
    const storedData: GoalType | null = getLocalStorageItem('goalData');

    const router = useRouter();
    const { onOpen } = useModal(ModalType.mealAddForm);
    const [selectedMealType, setSelectedMealType] = useState<MealsKeysType>('meal');

    const { meals, removeMeal, selectMeal, resetMeals } = useMealsStore();
    const { selectedDate } = useCalendarStore();
    const { data: dailySpec } = useFetchDailySpec(selectedDate);

    const { mutate: createMeals } = useCreateMeals(selectedDate);
    const { mutate: createDailySpec } = useCreateDailySpec(selectedDate);

    const nutrientTotals = calculateTotalNutrients(meals);

    if (!meals.length) return;

    const openMealDetail = (meal: MealItemType) => {
        selectMeal(meal);
        onOpen();
    };

    const addMealsItem = () => {
        selectMeal(null);
        onOpen();
    };

    const createMealsData = (data?: DailySpecType | null) => {
        const mealData = {
            daily_id: data?.id! || dailySpec?.id!,
            entry_date: selectedDate,
            meal_type: selectedMealType,
            meal: meals,
        };
        createMeals(mealData);
        resetMeals();
        router.push('/home');
    };

    const submitMeals = () => {
        if (!dailySpec) {
            const dailySpecData = {
                goal_id: storedData?.id!,
                entry_date: selectedDate,
                today_weight: 0,
                mood: null,
            };

            createDailySpec(dailySpecData, {
                onSuccess: (data) => {
                    createMealsData(data);
                },
            });
        } else {
            createMealsData();
        }
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
                                {meal.food_name}
                            </Text>
                            <Text size="sm" color="var(--grey600)">
                                {meal.serving_size ? `${meal.serving_size}g` : '자유입력'}
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
