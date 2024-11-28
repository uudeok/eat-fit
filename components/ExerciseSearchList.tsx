'use client';

import styles from '@styles/component/exerciseSearchList.module.css';
import { useFetchHealthMet } from '@/service/queries';
import EmptyState from './common/EmptyState';
import { Text } from './common';
import { DecodeHealthMetDataType } from '@/service/mappers/healthMetMapper';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useExercisesStore } from '@/shared/store/useExercisesStore';

const ExerciseSearchList = ({ keyword }: { keyword: string }) => {
    const { data: metDatas, isFetching } = useFetchHealthMet(keyword);
    const { onOpen } = useModal(ModalType.exerciseMetCalculator);

    const { selectExerciseMet } = useExercisesStore();

    const openExerciseDetail = (item: DecodeHealthMetDataType) => {
        selectExerciseMet(item);
        onOpen();
    };

    return (
        <ul className={styles.layout}>
            {metDatas?.metList.map((item) => (
                <div key={item.id} className={styles.metItem} onClick={() => openExerciseDetail(item)}>
                    <Text bold size="lg">
                        {item.exerciseName}
                    </Text>
                </div>
            ))}

            {!isFetching && metDatas?.isEmpty && (
                <div>
                    <EmptyState bottomText="검색결과가 없습니다" />
                </div>
            )}
        </ul>
    );
};

export default ExerciseSearchList;
