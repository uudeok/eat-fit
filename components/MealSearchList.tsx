'use client';

import styles from '@styles/component/mealSearchList.module.css';
import { DecodeFoodDataType } from '@/service/mappers/foodDataMapper';
import { ListRow, Text } from './common';
import { useInfiniteScroll, useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { foodDataKeys } from '@/service/utils/queryKey';
import { fetchFoodSearchResults } from '@/service/api/foodDataService';

const MealSearchList = ({ keyword }: { keyword: string }) => {
    const { onOpen } = useModal(ModalType.mealForm);
    const { selectMeal, addMeal } = useMealsStore();

    console.log(keyword);

    const {
        data: searchDatas,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: foodDataKeys.keyword(keyword),
        queryFn: ({ pageParam }) =>
            fetchFoodSearchResults({ startIdx: pageParam, endIdx: pageParam + 9, keyword: keyword }),
        initialPageParam: 1,
        enabled: !!keyword,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            return lastPage.foodList.length === 10 ? lastPageParam + 10 : undefined;
        },
        select: (data) => {
            const foodList = data.pages.flatMap((page) => page.foodList);

            return foodList;
        },
    });

    const { observerEl } = useInfiniteScroll({
        callbackFn: fetchNextPage,
        hasNextPage: hasNextPage,
    });

    if (!keyword) return;

    const openMealDetail = (meal: DecodeFoodDataType) => {
        selectMeal(meal);
        addMeal(meal);

        onOpen();
    };

    return (
        <>
            <ul className={styles.layout}>
                {searchDatas?.map((item) => (
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

            <div ref={observerEl} />
        </>
    );
};

export default MealSearchList;

// 'use client';

// import styles from '@styles/component/mealSearchList.module.css';
// import { DecodeFoodDataType } from '@/service/mappers/foodDataMapper';
// import { ListRow, LoadingBar, Text } from './common';
// import { useInfiniteScroll, useModal } from '@/hooks';
// import { ModalType } from './common/Modal/OverlayContainer';
// import { useMealsStore } from '@/shared/store/useMealsStore';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { foodDataKeys } from '@/service/utils/queryKey';
// import { fetchFoodData } from '@/service/api/foodDataService';
// import Loading from '@/app/loading';

// const MealSearchList = ({ keyword }: { keyword: string }) => {
//     const { onOpen } = useModal(ModalType.mealForm);
//     const { selectMeal, addMeal } = useMealsStore();

//     const {
//         data: searchDatas,
//         hasNextPage,
//         fetchNextPage,
//         isFetchingNextPage,
//         isFetching,
//     } = useInfiniteQuery({
//         queryKey: foodDataKeys.keyword(keyword),
//         queryFn: ({ pageParam }) => fetchFoodData({ startIdx: pageParam, endIdx: pageParam + 9, keyword: keyword }),
//         initialPageParam: 1,
//         enabled: !!keyword,
//         getNextPageParam: (lastPage, allPages, lastPageParam) => {
//             return lastPage.foodList.length === 10 ? lastPageParam + 10 : undefined;
//         },
//         select: (data) => {
//             const foodList = data.pages.flatMap((page) => page.foodList);

//             return foodList;
//         },
//     });

//     const { observerEl } = useInfiniteScroll({
//         callbackFn: fetchNextPage,
//         hasNextPage: hasNextPage,
//     });

//     if (!keyword) return;

//     const openMealDetail = (meal: DecodeFoodDataType) => {
//         selectMeal(meal);
//         addMeal(meal);

//         onOpen();
//     };

//     return (
//         <>
//             <ul className={styles.layout}>
//                 {searchDatas?.map((item) => (
//                     <ListRow
//                         onClick={() => openMealDetail(item)}
//                         className={styles.foodItem}
//                         key={item.id}
//                         left={
//                             <div className={styles.foodName}>
//                                 <Text bold size="lg">
//                                     {item.foodName}
//                                 </Text>
//                                 <Text size="sm" color="var(--grey600)">
//                                     {item.servingSize ? `${item.servingSize}g` : '자유입력'}
//                                 </Text>
//                             </div>
//                         }
//                         right={
//                             <div className={styles.action}>
//                                 <Text bold size="lg">
//                                     {item.calories || 0} kcal
//                                 </Text>
//                             </div>
//                         }
//                     />
//                 ))}
//             </ul>
//             {isFetchingNextPage && <LoadingBar />}
//             <div ref={observerEl} />
//         </>
//     );
// };

// export default MealSearchList;
