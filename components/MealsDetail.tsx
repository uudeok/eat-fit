'use client';

import styles from '@styles/pages/mealsDetailPage.module.css';
import { MEALS_TYPE } from '@/constants/meals';
import { Text, Badge, List, ListCol, ListRow, Penel, Spinner } from '@/components/common';
import Image from 'next/image';
import Icons from '@/assets';
import { calculateTotalNutrients, convertToKST } from '@/shared/utils';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';
import { MealItemType } from '@/service/@types';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';
import { useMealsStore } from '@/shared/store/useMealsStore';

const MealsDetail = ({ mealsId }: { mealsId: string }) => {
    const router = useRouter();
    const { onOpen: openMealDetail } = useModal(ModalType.mealForm);
    const { onOpen: openTimePicker } = useModal(ModalType.mealTime);

    const { selectMeal } = useMealsStore();
    const { data: mealDetail } = useFetchMealDetail(Number(mealsId));

    if (!mealDetail) return <Spinner />;

    const nutrients = calculateTotalNutrients(mealDetail.meal);
    const servingTime = convertToKST(mealDetail.serving_time);

    const NUTRIENTS = [
        { label: '탄수화물', value: nutrients.carbohydrate },
        { label: '단백질', value: nutrients.protein },
        { label: '지방', value: nutrients.fat },
    ];

    const showMealDetail = (item: MealItemType) => {
        selectMeal(item);
        openMealDetail();
    };

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.closeIcon}>
                    <Icons.Xmark width={20} onClick={() => router.back()} />
                </div>
                <div className={styles.imageContainer}>
                    <Image
                        src="/rice.png"
                        alt="Meal Image"
                        width={150}
                        height={150}
                        className={styles.mealImage}
                        priority
                    />
                    <Image src="/camera.png" alt="Camera Icon" width={30} height={30} className={styles.cameraIcon} />
                </div>

                <div className={styles.nutrientInfo}>
                    <Text size="xxlg" bold>
                        {nutrients?.calories}kcal
                    </Text>

                    <List className={styles.infoItem}>
                        {NUTRIENTS.map((nutrient) => (
                            <ListCol
                                key={nutrient.label}
                                top={
                                    <Text size="xlg" bold>
                                        {nutrient.label}
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
                                {MEALS_TYPE[mealDetail.meal_type]} {mealDetail.meal.length}
                            </Text>
                        }
                        right={
                            <Badge onClick={() => openTimePicker()}>
                                {servingTime
                                    ? `${servingTime.period} ${servingTime.hour}:${servingTime.minutes}`
                                    : '시간입력'}
                            </Badge>
                        }
                    />
                </List>

                {mealDetail.meal.map((m: any) => (
                    <div key={m.id}>
                        <Penel key={m.food_name} padding="15px" direction="column" onClick={() => showMealDetail(m)}>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MealsDetail;
