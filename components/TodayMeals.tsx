'use client';

import styles from '@styles/component/todayMeals.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMealAddPath } from '@/shared/utils';
import { Badge, ListRow, Text } from './common';
import { PlusButton } from './common/Button';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchMeals } from '@/service/queries';
import { MealsType } from '@/service/@types/res.type';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const TodayMeals = () => {
    const router = useRouter();
    const { selectedDate } = useSelectedDateStore();

    const formattedDate = dayjs(selectedDate).format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: meals } = useFetchMeals(formattedDate) as { data: MealsType[] };
    // const { data: meals } = useFetchMeals2(selectedDate) as { data: MealsType[] };

    return (
        <div className={styles.layout}>
            <ListRow
                left={
                    <Text bold size="xxlg" color="white">
                        식단 {meals?.length}개
                    </Text>
                }
                right={<PlusButton onClick={() => router.push(getMealAddPath())} />}
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

// 'use client';

// import styles from '@styles/component/todayMeals.module.css';
// import Image from 'next/image';
// import { Meals, Meals2, Meals3 } from '@/constants/meals';
// import { useRouter } from 'next/navigation';
// import { getMealAddPath, getMealPath } from '@/shared/utils';
// import { Badge, ListRow, Text } from './common';
// import { PlusButton } from './common/Button';

// const MEALS = [Meals, Meals2, Meals3];

// const TodayMeals = () => {
//     const router = useRouter();

//     return (
//         <div className={styles.layout}>
//             <ListRow
//                 left={
//                     <Text bold size="xxlg" color="white">
//                         식단 {MEALS.length}개
//                     </Text>
//                 }
//                 right={<PlusButton onClick={() => router.push(getMealAddPath())} />}
//             />

//             {MEALS.map((item) => (
//                 <div key={item.id} className={styles.mealCard} onClick={() => router.push(getMealPath(item.id))}>
//                     <Image src={'/rice.png'} alt="meal" className={styles.mealImage} width={120} height={130} />

//                     <div className={styles.mealInfo} key={item.meal[0].id}>
//                         <Text bold>
//                             {item.meal[0].food_name} {item.meal.length > 1 && `외 ${item.meal.length - 1}개`}
//                         </Text>

//                         <div className={styles.badgeContainer}>
//                             <div className={styles.badge}>
//                                 <Badge>{item.meal[0].calories} kcal</Badge>
//                                 <Badge>탄 {item.meal[0].carbohydrate}g</Badge>
//                                 <Badge>단 {item.meal[0].protein}g</Badge>
//                                 <Badge>지 {item.meal[0].fat}g</Badge>
//                             </div>
//                         </div>

//                         <div className={styles.mealContent}>{item.meal[0].content}</div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TodayMeals;
