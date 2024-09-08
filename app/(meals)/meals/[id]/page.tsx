'use client';

import styles from '@styles/pages/mealsPage.module.css';
import { Meals, Meals2, Meals3, MealsType } from '@/constants/meals';
import Text from '@/components/common/Text';
import Image from 'next/image';
import Icons from '@/assets';
import List, { ListCol, ListRow } from '@/components/common/List';
import { calculateNutrientTotals } from '@/shared/utils';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

/** maybeSingle 로 해서 배열말고 오브젝트로 받아오면 편할듯! */

const MealsPage = ({ params: { id } }: { params: { id: string } }) => {
    const router = useRouter();
    const MEALS = [Meals, Meals2, Meals3];

    const selectedMeals = MEALS.filter((meal) => meal.id === Number(id));
    const totals = useMemo(() => calculateNutrientTotals(selectedMeals), [selectedMeals]);

    const NUTRIENTS = [
        { key: '탄수화물', value: totals.carbohydrate },
        { key: '단백질', value: totals.protein },
        { key: '지방', value: totals.fat },
    ];

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.closeIcon}>
                    <Icons.Xmark width={17} onClick={() => router.back()} />
                </div>
                <div className={styles.imageContainer}>
                    <Image src="/rice.png" alt="Meal Image" width={150} height={150} className={styles.mealImage} />
                    <Image src="/camera.png" alt="Camera Icon" width={30} height={30} className={styles.cameraIcon} />
                </div>

                <div className={styles.nutrientInfo}>
                    <Text size="xxlg" bold>
                        {totals.calories}kcal
                    </Text>

                    <List className={styles.infoItem}>
                        {NUTRIENTS.map((nutrient) => (
                            <ListCol
                                key={nutrient.key}
                                top={
                                    <Text size="lg" bold>
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
                <Text size="xlg" bold>
                    식사 {selectedMeals[0].meal.length}
                </Text>

                {selectedMeals.map((item) => (
                    <div key={item.id}>
                        {item.meal.map((m) => (
                            <List key={m.id} className={styles.mealItem}>
                                <ListRow
                                    left={
                                        <div className={styles.mealInfo}>
                                            <Text bold>{m.food_name}</Text>
                                            <Text size="sm" color="var(--grey600)">
                                                ({m.serving_size}g)
                                            </Text>
                                        </div>
                                    }
                                    right={
                                        <div className={styles.mealAction}>
                                            <Text bold>{m.calories} kcal</Text>
                                            <Icons.Xmark width={10} height={10} />
                                        </div>
                                    }
                                />
                            </List>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealsPage;
