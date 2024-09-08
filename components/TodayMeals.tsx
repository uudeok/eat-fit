'use client';

import styles from '@styles/component/todayMeals.module.css';
import { useState } from 'react';
import Badge from './common/Badge';
import Text from './common/Text';
import Icons from '@/assets';
import Image from 'next/image';
import { Meals, Meals2, Meals3 } from '@/constants/meals';
import { useRouter } from 'next/navigation';

const MEALS = [Meals, Meals2, Meals3];

const TodayMeals = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
        setIsActive((prevState) => !prevState);
    };

    const handleClicks = () => {
        console.log('asd');
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Text bold size="xxlg" color="white">
                    식단 {MEALS.length}개
                </Text>
                <button className={`${styles.addBtn} ${isActive ? styles.active : ''}`} onClick={handleClick}>
                    {isActive ? <Icons.Plus width={15} onClick={handleClicks} /> : <Icons.Xmark width={15} />}
                </button>
            </div>

            {MEALS.map((item) => (
                <div key={item.id} className={styles.mealCard} onClick={() => router.push(`/meals/${item.id}`)}>
                    <Image src={item.photo_url} alt="meal" className={styles.mealImage} width={120} height={130} />

                    <div className={styles.mealInfo} key={item.meal[0].id}>
                        <Text bold>
                            {item.meal[0].food_name} {item.meal.length > 1 && `외 ${item.meal.length - 1}개`}
                        </Text>

                        {/* <Text size="sm" color="grey">
                            ({item.meal[0].serving_size}g)
                        </Text> */}

                        <div className={styles.badgeContainer}>
                            <div className={styles.badge}>
                                <Badge>{item.meal[0].calories} kcal</Badge>
                                <Badge>탄 {item.meal[0].carbohydrate}g</Badge>
                                <Badge>단 {item.meal[0].protein}g</Badge>
                                <Badge>지 {item.meal[0].fat}g</Badge>
                            </div>
                        </div>

                        <div className={styles.mealContent}>{item.meal[0].content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayMeals;
