'use client';

import styles from '@styles/component/mealSearchList.module.css';
import { DecodeFoodDataType } from '@/service/mappers/foodDataMapper';
import { ListRow, Text } from './common';
import { useInfiniteScroll, useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { foodDataKeys } from '@/service/utils/queryKey';
import { fetchFoodSearchResults } from '@/service/api/foodDataApi';
import EmptyState from './common/EmptyState';

const MealSearchList = ({ keyword }: { keyword: string }) => {
    const { onOpen } = useModal(ModalType.mealSearchFormSheet);
    const { setSearchMeal } = useMealsStore();

    const {
        data: searchDatas = [],
        hasNextPage,
        fetchNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: foodDataKeys.keyword(keyword),
        queryFn: ({ pageParam }) => fetchFoodSearchResults({ pageNum: pageParam, pageSize: 20, keyword: keyword }),
        initialPageParam: 1,
        enabled: !!keyword,
        retry: 0,
        getNextPageParam: (lastPage) => {
            const totalPages = Math.ceil(lastPage.meta.totalCount / lastPage.meta.pageSize);
            return lastPage.meta.pageNum < totalPages ? lastPage.meta.pageNum + 1 : undefined;
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

    if (!keyword) return null;

    const openMealDetail = (meal: DecodeFoodDataType) => {
        setSearchMeal(meal);

        onOpen();
    };

    return (
        <>
            <ul className={styles.layout}>
                {searchDatas.map((item) => (
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

                {!isFetching && searchDatas.length === 0 && (
                    <div>
                        <EmptyState bottomText="검색결과가 없습니다" />
                    </div>
                )}
            </ul>

            <div ref={observerEl} />
        </>
    );
};

export default MealSearchList;
