'use client';

import styles from '@styles/pages/mealsDetailPage.module.css';
import { MealType, Meals, Meals2, Meals3 } from '@/constants/meals';
import { Text, Badge, List, ListCol, ListRow, Penel } from '@/components/common';
import Image from 'next/image';
import Icons from '@/assets';
import { calculateNutrientTotals } from '@/shared/utils';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import useMealItemStore from '@/shared/store/useMealItemStore';

/* maybeSingle 로 해서 배열말고 오브젝트로 받아오면 편할듯! */

const MealsDetailPage = ({ params: { id } }: { params: { id: string } }) => {
    const router = useRouter();
    const MEALS = [Meals, Meals2, Meals3];
    const { onOpen: openMealDetail } = useModal('mealDetail');
    const { onOpen: openTimePicker } = useModal('mealTime');
    const { setSelectedMealItem } = useMealItemStore();

    const selectedMeals = MEALS.filter((meal) => meal.id === Number(id));

    const totals = useMemo(() => calculateNutrientTotals(selectedMeals), [selectedMeals]);

    const NUTRIENTS = [
        { key: '탄수화물', value: totals?.carbohydrate },
        { key: '단백질', value: totals?.protein },
        { key: '지방', value: totals?.fat },
    ];

    const showMealDetail = (item: MealType) => {
        setSelectedMealItem(item);
        openMealDetail();
    };

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.closeIcon}>
                    <Icons.Xmark width={20} onClick={() => router.back()} />
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/rice.png" alt="Meal Image" width={150} height={150} className={styles.mealImage} />
                    <Image src="/camera.png" alt="Camera Icon" width={30} height={30} className={styles.cameraIcon} />
                </div>

                <div className={styles.nutrientInfo}>
                    <Text size="xxlg" bold>
                        {totals?.calories}kcal
                    </Text>

                    <List className={styles.infoItem}>
                        {NUTRIENTS.map((nutrient) => (
                            <ListCol
                                key={nutrient.key}
                                top={
                                    <Text size="xlg" bold>
                                        {nutrient.key}
                                    </Text>
                                }
                                bottom={
                                    <Text bold size="xlg">
                                        {nutrient.value}g
                                    </Text>
                                }
                            />
                        ))}
                    </List>
                </div>
            </div>

            <div className={styles.bottom}>
                <List className={styles.sectionHeader}>
                    <ListRow
                        left={
                            <Text size="xlg" bold>
                                식사 {selectedMeals[0]?.meal.length}
                            </Text>
                        }
                        right={
                            <Badge onClick={() => openTimePicker()}>
                                {selectedMeals[0]?.serving_time ? selectedMeals[0].serving_time : '시간 입력'}
                            </Badge>
                        }
                    />
                </List>

                {selectedMeals.map((item) => (
                    <div key={item.id}>
                        {item.meal.map((m) => (
                            <Penel key={m.id} padding="15px" direction="column" onClick={() => showMealDetail(m)}>
                                <ListRow
                                    left={
                                        <div className={styles.mealInfo}>
                                            <Text bold>{m.food_name}</Text>
                                            <Text size="sm" color="var(--grey600)">
                                                {m.serving_size ? `${m.serving_size}g` : '자유입력'}
                                            </Text>
                                        </div>
                                    }
                                    right={
                                        <div className={styles.mealKcal}>
                                            <Text bold>{m.calories} kcal</Text>
                                        </div>
                                    }
                                />
                            </Penel>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealsDetailPage;
