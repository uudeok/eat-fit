'use client';

import styles from '@styles/component/mealsDetailPage.module.css';
import { MEALS_TYPE } from '@/constants/meals';
import { Text, Badge, List, ListCol, ListRow, Penel, Spinner } from '@/components/common';
import Image from 'next/image';
import Icons from '@/assets';
import { calculateTotalNutrients } from '@/shared/utils';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { useDeleteMeals, useUpdateMeals } from '@/service/mutations';
import { DecodeMealItemType, encodeUpdateMeal } from '@/service/mappers/mealsMapper';

const MealsDetail = ({ mealsId }: { mealsId: string }) => {
    const router = useRouter();

    const { onOpen: openMealDetail } = useModal(ModalType.mealForm);
    const { onOpen: openTimePicker } = useModal(ModalType.mealTime);

    const { selectMeal } = useMealsStore();
    const { data: mealDetail } = useFetchMealDetail(Number(mealsId));

    const { mutate: updateMeals } = useUpdateMeals();
    const { mutate: deleteMeals } = useDeleteMeals();

    if (!mealDetail) return <Spinner />;

    const nutrientsTotals = calculateTotalNutrients(mealDetail.mealItem);

    const NUTRIENTS = [
        { label: '탄수화물', value: nutrientsTotals.carbohydrate },
        { label: '단백질', value: nutrientsTotals.protein },
        { label: '지방', value: nutrientsTotals.fat },
    ];

    const showMealDetail = (item: DecodeMealItemType) => {
        selectMeal(item);
        openMealDetail();
    };

    const removeMealItem = (e: React.MouseEvent, mealId: number) => {
        e.stopPropagation();
        const isProceed = window.confirm('삭제하시겠습니까?');

        if (isProceed) {
            const updatedMeal = mealDetail.mealItem.filter((meal: DecodeMealItemType) => meal.id !== mealId);

            const updatedData = encodeUpdateMeal({
                ...mealDetail,
                mealItem: updatedMeal,
            });

            if (updatedMeal.length === 0) {
                deleteMeals(mealDetail.id);
                router.push('/home');
            } else {
                updateMeals({
                    ...updatedData,
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
                        {nutrientsTotals.calories}kcal
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
                                {MEALS_TYPE[mealDetail.mealType]} {mealDetail.mealItem.length}
                            </Text>
                        }
                        right={
                            <Badge onClick={() => openTimePicker()}>
                                {mealDetail.servingTime
                                    ? `${mealDetail.servingTime.period} ${mealDetail.servingTime.hour}:${mealDetail.servingTime.minutes}`
                                    : '시간입력'}
                            </Badge>
                        }
                    />
                </List>

                {mealDetail.mealItem.map((m: DecodeMealItemType) => (
                    <div key={m.id}>
                        <Penel key={m.foodName} padding="15px" direction="column" onClick={() => showMealDetail(m)}>
                            <ListRow
                                left={
                                    <div className={styles.mealInfo}>
                                        <Text bold>{m.foodName}</Text>
                                        <Text size="sm" color="var(--grey600)">
                                            {m.servingSize ? `${m.servingSize}g` : '자유입력'}
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
