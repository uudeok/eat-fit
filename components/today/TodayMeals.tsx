'use client';

import styles from '@styles/component/todayMeals.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Badge, ListRow, Text } from '../common';
import { PlusButton } from '../common/Button';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchMeals } from '@/service/queries';
import EmptyState from '../common/EmptyState';

const TodayMeals = () => {
    const router = useRouter();
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: mealsData } = useFetchMeals(formattedDate);

    return (
        <div className={styles.layout}>
            <ListRow
                left={
                    <Text bold size="xxlg" color="white">
                        식단 {mealsData?.mealsList.length}개
                    </Text>
                }
                right={
                    <div>
                        <PlusButton onClick={() => router.push('/meals/add')} />
                    </div>
                }
            />

            {mealsData?.isEmpty ? (
                <div className={styles.empty}>
                    <EmptyState bottomText="식단을 입력해주세요" />
                </div>
            ) : (
                mealsData?.mealsList.map((data) => (
                    <div key={data.id} className={styles.mealCard} onClick={() => router.push(`/meals/${data.id}`)}>
                        <Image
                            src={`/${data.mealType}.png`}
                            alt="meal"
                            className={styles.mealImage}
                            width={80}
                            height={80}
                        />

                        <div className={styles.mealInfo}>
                            <Text bold>
                                {data.mealItem[0].foodName}{' '}
                                {data.mealItem.length > 1 && `외 ${data.mealItem.length - 1}개`}
                            </Text>

                            <div className={styles.badgeContainer}>
                                <div className={styles.badge}>
                                    <Badge>{data.mealItem[0].calories} kcal</Badge>
                                    <Badge>탄 {data.mealItem[0].carbohydrate}g</Badge>
                                    <Badge>단 {data.mealItem[0].protein}g</Badge>
                                    <Badge>지 {data.mealItem[0].fat}g</Badge>
                                </div>
                            </div>

                            <div className={styles.mealContent}>{data.mealItem[0].content}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TodayMeals;
