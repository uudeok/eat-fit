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
