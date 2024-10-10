'use client';

import styles from '@styles/component/todayExercises.module.css';
import Image from 'next/image';
import { Text, List, ListRow, ListCol, Spinner } from './common';
import { Button } from './common/Button';
import { EXERCISE_INTENSITY_LABELS } from '@/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BurnedCaloriesType, calculateExercisesTotals, getExerciseAddPage } from '@/shared/utils';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useFetchExercises } from '@/service/queries';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { ExerciseType } from '@/service/@types/res.type';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import Icons from '@/assets';
import { useDeleteExercises } from '@/service/mutations/useDeleteExercises';
import { useUpdateExercises } from '@/service/mutations';

const TodayExercises = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseForm);
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();
    const { selectExercise } = useExercisesStore();

    const [exerciseTotals, setExerciseTotals] = useState<BurnedCaloriesType>({ duration_min: 0, calories_burned: 0 });

    const { data: exercisesData } = useFetchExercises(formattedDate);
    const { mutateAsync: deleteExercises } = useDeleteExercises(formattedDate);
    const { mutateAsync: updateExercises } = useUpdateExercises(formattedDate);

    useEffect(() => {
        if (exercisesData && exercisesData.exercise) {
            const exerciseTotals = calculateExercisesTotals(exercisesData.exercise);
            setExerciseTotals(exerciseTotals);
        } else {
            setExerciseTotals({ duration_min: 0, calories_burned: 0 });
        }
    }, [exercisesData]);

    const EXERCISES_SUMMARY = [
        { label: '총 운동 시간', value: exerciseTotals.duration_min, unit: '분' },
        { label: '총 소모량', value: exerciseTotals.calories_burned, unit: 'kcal' },
    ];

    const handleExerciseItem = (exercise: ExerciseType) => {
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
                await updateExercises({
                    id: exercisesData!.id,
                    exercise: updatedExercises!,
                });
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
                    {exercisesData?.exercise.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={styles.exerciseItem}
                            onClick={() => handleExerciseItem(exercise)}
                        >
                            <ListRow
                                left={
                                    <div className={styles.exerciseName}>
                                        <Text bold>{exercise.exercise_name}</Text>
                                        <Text size="sm">
                                            {exercise.duration_min}분{' '}
                                            {EXERCISE_INTENSITY_LABELS[exercise.exercise_intensity!]}
                                        </Text>
                                    </div>
                                }
                                right={
                                    <div className={styles.action}>
                                        <Text bold>{exercise.calories_burned} Kcal</Text>
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
                    ))}
                </List>
            </div>

            <Button className={styles.addButton} onClick={() => router.push(getExerciseAddPage())}>
                추가
            </Button>
        </div>
    );
};

export default TodayExercises;
