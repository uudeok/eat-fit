'use client';

import styles from '@styles/pages/exerciseAddPage.module.css';
import Icons from '@/assets';
import { Search, Bubble } from '@/components/common';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import ExerciseAddList from '@/components/ExerciseAddList';
import { useEffect } from 'react';

const ExerciseAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseForm);
    const { exercises, resetExercises } = useExercisesStore();

    const handleSearch = (inputValue: string) => {
        // 검색 결과를 가지고 API 조회
        console.log(inputValue);
    };

    useEffect(() => {
        return () => {
            resetExercises();
        };
    }, [resetExercises]);

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Icons.ArrowLeft width={15} onClick={() => router.push('/home')} />
                <Search placeHolder="어떤 운동을 하셨나요?" onClick={handleSearch} />
            </div>

            <div className={styles.content}>
                {!exercises.length && (
                    <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
                )}
                <ExerciseAddList />
            </div>
        </div>
    );
};

export default ExerciseAddPage;
