'use client';

import styles from '@styles/pages/mealAddPage.module.css';
import Search from '@/components/common/Search';
import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import Bubble from '@/components/common/Bubble';
import { useModal } from '@/hooks';

const MealAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal('mealAddForm');

    const handleSearch = (inputValue: string) => {
        // 검색 결과를 가지고 API 조회
        console.log(inputValue);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Icons.ArrowLeft width={15} onClick={() => router.push('/')} />
                <Search placeHolder="어떤 음식을 드셨나요?" onClick={handleSearch} />
            </div>

            <div className={styles.content}>
                <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
            </div>
        </div>
    );
};

export default MealAddPage;
