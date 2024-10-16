'use client';

import styles from '@styles/component/todayExercises.module.css';
import Image from 'next/image';
import Icons from '@/assets';
import EmptyState from '../common/EmptyState';
import { Text, List, ListRow, ListCol, LoadingBar } from '../common';
import { PlusButton } from '../common/Button';
import { EXERCISE_INTENSITY_LABELS } from '@/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BurnedCaloriesType, calculateExercisesTotals } from '@/shared/utils';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useFetchExercises } from '@/service/queries';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import { useDeleteExercises } from '@/service/mutations/useDeleteExercises';
import { useUpdateExercises } from '@/service/mutations';
import { DecodeExercisesItemType, encodeUpdateExercise } from '@/service/mappers/exercisesMapper';

const TodayExercises = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseForm);
    const { getFormattedDate } = useSelectedDateStore();

    const formattedDate = getFormattedDate();
    const { selectExercise } = useExercisesStore();

    const [exerciseTotals, setExerciseTotals] = useState<BurnedCaloriesType>({ durationMin: 0, caloriesBurned: 0 });

    const { data: exercisesData, isLoading } = useFetchExercises(formattedDate);
    const { mutateAsync: deleteExercises } = useDeleteExercises(formattedDate);
    const { mutateAsync: updateExercises } = useUpdateExercises(formattedDate);

    console.log(exercisesData);

    useEffect(() => {
        if (exercisesData && exercisesData.exercise) {
            const exerciseTotals = calculateExercisesTotals(exercisesData.exercise);
            setExerciseTotals(exerciseTotals);
        } else {
            setExerciseTotals({ durationMin: 0, caloriesBurned: 0 });
        }
    }, [exercisesData]);

    const EXERCISES_SUMMARY = [
        { label: '총 운동 시간', value: exerciseTotals.durationMin, unit: '분' },
        { label: '총 소모량', value: exerciseTotals.caloriesBurned, unit: 'kcal' },
    ];

    const handleExerciseItem = (exercise: DecodeExercisesItemType) => {
        selectExercise(exercise);
        onOpen();
    };

    const removeExerciseItem = async (e: React.MouseEvent, exerciseId: number) => {
        e.stopPropagation();

        const isProceed = window.confirm('삭제하시겠습니까?');

        if (isProceed) {
            const updatedExercises = exercisesData?.exercise.filter((exer) => exer.id !== exerciseId);

            if (updatedExercises!.length === 0) {
                await deleteExercises(exercisesData!.id);
                router.replace('/home');
            } else {
                const updateData = encodeUpdateExercise({
                    id: exercisesData!.id,
                    exercise: updatedExercises!,
                });

                await updateExercises({ ...updateData });
            }
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.summary}>
                <Image src="/exercise_jump.png" alt="jump rope icon" width={140} height={120} />

                <div className={styles.summaryLayout}>
                    {EXERCISES_SUMMARY.map((summary) => (
                        <List key={summary.label}>
                            <ListCol
                                top={
                                    <Text color="white" bold size="xlg">
                                        {summary.label}
                                    </Text>
                                }
                                bottom={
                                    <Text color="white" bold size="xxlg">
                                        {summary.value}
                                        {summary.unit}
                                    </Text>
                                }
                            />
                        </List>
                    ))}
                </div>
            </div>

            <div className={styles.todayExercise}>
                <List className={styles.exerciseList}>
                    {isLoading ? (
                        <LoadingBar />
                    ) : exercisesData ? (
                        exercisesData.exercise.map((exercise) => (
                            <div
                                key={exercise.id}
                                className={styles.exerciseItem}
                                onClick={() => handleExerciseItem(exercise)}
                            >
                                <ListRow
                                    left={
                                        <div className={styles.exerciseName}>
                                            <Text bold>{exercise.exerciseName}</Text>
                                            <Text size="sm">
                                                {exercise.durationMin}분{' '}
                                                {EXERCISE_INTENSITY_LABELS[exercise.exerciseIntensity!]}
                                            </Text>
                                        </div>
                                    }
                                    right={
                                        <div className={styles.action}>
                                            <Text bold>{exercise.caloriesBurned} Kcal</Text>
                                            <Icons.FillXmark
                                                width={15}
                                                onClick={(e: React.MouseEvent) => removeExerciseItem(e, exercise.id)}
                                            />
                                        </div>
                                    }
                                />

                                <div className={styles.content}>
                                    <Text size="sm">{exercise.content}</Text>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyState bottomText="운동을 기록해주세요" />
                    )}
                </List>
            </div>

            <div className={styles.addBtn}>
                <PlusButton backgroundColor="var(--green400)" onClick={() => router.push('/exercise/add')} />
            </div>
        </div>
    );
};

export default TodayExercises;
