'use client';

import styles from '@styles/component/mealSearchList.module.css';
import { DecodeFoodDataListType, DecodeFoodDataType } from '@/service/mappers/foodDataMapper';
import { ListRow, Text } from './common';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { useEffect } from 'react';

const MealSearchList = ({ searchFoodData }: { searchFoodData: DecodeFoodDataListType }) => {
    console.log(searchFoodData);
    const { onOpen } = useModal(ModalType.mealForm);
    const { selectMeal, addMeal, removeMeal } = useMealsStore();

    // useEffect(() => {
    //     return () => {

    //     }
    // })

    const foodList = searchFoodData.foodList;

    const openMealDetail = (meal: DecodeFoodDataType) => {
        console.log(meal);
        selectMeal(meal);
        addMeal(meal);
        onOpen();
    };

    if (searchFoodData.isEmpty) return;

    return (
        <ul className={styles.layout}>
            {foodList.map((item) => (
                <ListRow
                    onClick={() => openMealDetail(item)}
                    className={styles.foodItem}
                    key={item.id}
                    left={
                        <div className={styles.foodName}>
                            <Text bold size="lg">
                                {item.foodName}
                            </Text>
                            <Text size="sm" color="var(--grey600)">
                                {item.servingSize ? `${item.servingSize}g` : '자유입력'}
                            </Text>
                        </div>
                    }
                    right={
                        <div className={styles.action}>
                            <Text bold size="lg">
                                {item.calories || 0} kcal
                            </Text>
                        </div>
                    }
                />
            ))}
        </ul>
    );
};

export default MealSearchList;
