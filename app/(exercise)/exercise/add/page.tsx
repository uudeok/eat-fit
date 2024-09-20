'use client';

import styles from '@styles/pages/exerciseAddPage.module.css';
import Icons from '@/assets';
import { Search, Bubble } from '@/components/common';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';

const ExerciseAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseAddForm);

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
