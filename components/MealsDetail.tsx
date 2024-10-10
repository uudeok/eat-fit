'use client';

import styles from '@styles/component/mealsDetailPage.module.css';
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
import { useDeleteMeals, useUpdateMeals } from '@/service/mutations';

const MealsDetail = ({ mealsId }: { mealsId: string }) => {
    const router = useRouter();

    const { onOpen: openMealDetail } = useModal(ModalType.mealForm);
    const { onOpen: openTimePicker } = useModal(ModalType.mealTime);

    const { selectMeal } = useMealsStore();
    const { data: mealDetail } = useFetchMealDetail(Number(mealsId));
    const { mutate: updateMeals } = useUpdateMeals(mealDetail?.entry_date!);
    const { mutate: deleteMeals } = useDeleteMeals(mealDetail?.entry_date!);

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

    const removeMealItem = (e: React.MouseEvent, mealId: number) => {
        e.stopPropagation();
        const isProceed = window.confirm('삭제하시겠습니까?');

        if (isProceed) {
            const updatedMeal = mealDetail.meal.filter((meal: MealItemType) => meal.id !== mealId);

            if (updatedMeal.length === 0) {
                deleteMeals(mealDetail.id);
                router.push('/home');
            } else {
                updateMeals({
                    id: mealDetail.id,
                    serving_time: mealDetail.serving_time,
                    meal: updatedMeal,
                    meal_type: mealDetail.meal_type,
                });
            }
        }
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

                {mealDetail.meal.map((m: MealItemType) => (
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
                                    <div className={styles.action}>
                                        <Text bold>{m.calories} kcal</Text>
                                        <Icons.FillXmark
                                            width={13}
                                            onClick={(e: React.MouseEvent) => removeMealItem(e, m.id)}
                                        />
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
