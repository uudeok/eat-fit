'use client';

import styles from '@styles/component/todayMeals.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge, ListRow, Text } from './common';
import { PlusButton } from './common/Button';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchMeals } from '@/service/queries';

const TodayMeals = () => {
    const router = useRouter();
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: meals } = useFetchMeals(formattedDate);

    return (
        <div className={styles.layout}>
            <ListRow
                left={
                    <Text bold size="xxlg" color="white">
                        식단 {meals?.length}개
                    </Text>
                }
                right={
                    <div>
                        <PlusButton onClick={() => router.push('/meals/add')} />
                    </div>
                }
            />

            {meals?.map((data) => (
                <div key={data.id} className={styles.mealCard} onClick={() => router.push(`/meals/${data.id}`)}>
                    <Image
                        src={`/${data.meal_type}.png`}
                        alt="meal"
                        className={styles.mealImage}
                        width={80}
                        height={80}
                    />

                    <div className={styles.mealInfo}>
                        <Text bold>
                            {data.meal[0].food_name} {data.meal.length > 1 && `외 ${data.meal.length - 1}개`}
                        </Text>

                        <div className={styles.badgeContainer}>
                            <div className={styles.badge}>
                                <Badge>{data.meal[0].calories} kcal</Badge>
                                <Badge>탄 {data.meal[0].carbohydrate}g</Badge>
                                <Badge>단 {data.meal[0].protein}g</Badge>
                                <Badge>지 {data.meal[0].fat}g</Badge>
                            </div>
                        </div>

                        <div className={styles.mealContent}>{data.meal[0].content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayMeals;
