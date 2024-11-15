'use client';

import styles from '@styles/pages/exerciseAddPage.module.css';
import Icons from '@/assets';
import { Search, Bubble } from '@/components/common';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks';
import { ModalType } from '@/components/common/Modal/OverlayContainer';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import ExerciseAddList from '@/components/ExerciseAddList';
import { useEffect, useState } from 'react';
import ExerciseSearchList from '@/components/ExerciseSearchList';

const ExerciseAddPage = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseForm);
    const { exercises, resetExercises } = useExercisesStore();

    const [keyword, setKeyword] = useState<string>('');

    const handleSearch = (inputValue: string) => {
        console.log(inputValue);
        setKeyword(inputValue);
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
                <Search placeHolder="어떤 운동을 하셨나요?" onSubmit={handleSearch} />
            </div>

            <div className={styles.content}>
                {!exercises.length && !keyword && (
                    <Bubble content="검색없이 자유 입력!" icon={<Icons.Pencil width={20} />} onClick={onOpen} />
                )}

                <ExerciseAddList />
                <ExerciseSearchList keyword={keyword} />
            </div>
        </div>
    );
};

export default ExerciseAddPage;
