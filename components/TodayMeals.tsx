'use client';

import styles from '../styles/component/todayMeals.module.css';
import { useState } from 'react';
import Badge from './common/Badge';
import Text from './common/Text';
import Icons from '@/assets';
import Image from 'next/image';

const MEAL_LIST = [
    {
        img: '/rice.png',
        id: 1,
        type: '식사',
        serving_time: '오후 12:52',
        content: '맛있는 한끼',
        carbohydrate: 9.4,
        protein: 25.72,
        fat: 9.5,
        kcal: 230,
    },
    {
        img: '/rice.png',
        id: 2,
        type: '간식',
        serving_time: '오후 01:30',
        content: '밥 먹고 아메리카노',
        carbohydrate: 0.5,
        protein: 0,
        fat: 0,
        kcal: 5,
    },
    {
        img: '/rice.png',
        id: 3,
        type: '식사',
        serving_time: '오후 06:52',
        content: '가족들과 복많네해물칼국수에 가서 해물칼국수와 해물파전을 맛있게 먹었다',
        carbohydrate: 50,
        protein: 9,
        fat: 4.5,
        kcal: 280,
    },
];

const TodayMeals = () => {
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
        setIsActive((prevState) => !prevState);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Text bold size="xxlg" color="white">
                    식단 3개
                </Text>
                <button className={`${styles.addBtn} ${isActive ? styles.active : ''}`} onClick={handleClick}>
                    {isActive ? <Icons.Plus width={15} /> : <Icons.Xmark width={15} />}
                </button>
            </div>

            {MEAL_LIST.map((meal) => (
                <div key={meal.id} className={styles.mealCard}>
                    <Image src={meal.img} alt="meal" className={styles.mealImage} width={120} height={130} />

                    <div className={styles.mealInfo}>
                        <Text bold>{meal.type}</Text>
                        <Text size="sm" color="grey">
                            {meal.serving_time}
                        </Text>

                        <div className={styles.badgeContainer}>
                            <div className={styles.badge}>
                                <Badge>{meal.kcal} kcal</Badge>
                                <Badge>탄 {meal.carbohydrate}g</Badge>
                                <Badge>단 {meal.protein}g</Badge>
                                <Badge>지 {meal.fat}g</Badge>
                            </div>
                        </div>

                        <div className={styles.mealContent}>{meal.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayMeals;
