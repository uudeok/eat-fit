'use client';

import styles from '@styles/pages/mealAddPage.module.css';
import { Search, Bubble } from '@/components/common';
import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';
import MealAddList from '@/components/MealAddList';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { useEffect, useState } from 'react';
import MealSearchList from '@/components/MealSearchList';

const MealAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.mealForm);
    const { meals, resetMeals } = useMealsStore();
    const [keyword, setKeyword] = useState<string>('');

    const handleSearch = (inputValue: string) => {
        setKeyword(inputValue);
    };

    useEffect(() => {
        return () => {
            resetMeals();
        };
    }, [resetMeals]);

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Icons.ArrowLeft width={15} onClick={() => router.push('/home')} />
                <Search placeHolder="어떤 음식을 드셨나요?" onSubmit={handleSearch} />
            </div>

            <div className={styles.content}>
                {!meals.length && !keyword && (
                    <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
                )}

                <MealAddList />
                <MealSearchList keyword={keyword} />
            </div>
        </div>
    );
};

export default MealAddPage;

// 'use client';

// import styles from '@styles/pages/mealAddPage.module.css';
// import { Search, Bubble } from '@/components/common';
// import Icons from '@/assets';
// import { useRouter } from 'next/navigation';
// import { useModal } from '@/hooks';
// import { ModalType } from '@/components/common/Modal/OverlayContainer';
// import MealAddList from '@/components/MealAddList';
// import { useMealsStore } from '@/shared/store/useMealsStore';
// import { useEffect, useState } from 'react';
// import { fetchFoodData } from '@/service/api/foodDataService';
// import MealSearchList from '@/components/MealSearchList';
// import { DecodeFoodDataListType } from '@/service/mappers/foodDataMapper';

// const MealAddPage = () => {
//     const router = useRouter();
//     const { onOpen } = useModal(ModalType.mealForm);
//     const { meals, resetMeals } = useMealsStore();

//     const [searchData, setSearchData] = useState<DecodeFoodDataListType>({ foodList: [], isEmpty: true });

//     const handleSearch = async (inputValue: string) => {
//         const data = await fetchFoodData({ startIdx: 1, endIdx: 10, keyword: inputValue });
//         setSearchData(data);
//     };

//     useEffect(() => {
//         return () => {
//             resetMeals();
//         };
//     }, [resetMeals]);

//     return (
//         <div className={styles.layout}>
//             <div className={styles.header}>
//                 <Icons.ArrowLeft width={15} onClick={() => router.push('/home')} />

//                 <div className={styles.searchCount}>
//                     <Search placeHolder="어떤 음식을 드셨나요?" onSubmit={handleSearch} />
//                     {/* <CircleText text={meals.length} size={25} /> */}
//                 </div>
//             </div>

//             <div className={styles.content}>
//                 {!meals.length && searchData.isEmpty && (
//                     <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
//                 )}

//                 <MealAddList />
//                 <MealSearchList searchFoodData={searchData} />
//             </div>
//         </div>
//     );
// };

// export default MealAddPage;
