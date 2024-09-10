'use client';

import styles from '@styles/pages/exerciseAddPage.module.css';
import Icons from '@/assets';
import Search from '@/components/common/Search';
import Bubble from '@/components/common/Bubble';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';

const ExerciseAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal('exerciseAddForm');

    const handleSearch = (inputValue: string) => {
        // 검색 결과를 가지고 API 조회
        console.log(inputValue);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Icons.ArrowLeft width={15} onClick={() => router.push('/')} />
                <Search placeHolder="어떤 운동을 하셨나요?" onClick={handleSearch} />
            </div>

            <div className={styles.content}>
                <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
            </div>
        </div>
    );
};

export default ExerciseAddPage;
