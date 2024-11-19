'use client';

import styles from '@styles/component/exerciseAddList.module.css';
import Icons from '@/assets';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import { ListRow, Text } from './common';
import { EXERCISE_INTENSITY_LABELS } from '@/constants';
import { Button } from './common/Button';
import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useFetchDailySpec, useFetchExercises, useFetchGoalsByStatus } from '@/service/queries';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useCreateDailySpec, useCreateExercises, useUpdateExercises } from '@/service/mutations';
import { useRouter } from 'next/navigation';
import { calculateExercisesTotals } from '@/shared/utils';
import { encodeCreateDailySpec } from '@/service/mappers/dailyMapper';
import {
    DecodeExercisesItemType,
    encodeCreateExercises,
    encodeUpdateExercise,
} from '@/service/mappers/exercisesMapper';

const ExerciseAddList = () => {
    const router = useRouter();
    const { onOpen } = useModal(ModalType.exerciseForm);
    const { exercises, selectExercise, removeExercises, exerciseItem } = useExercisesStore();

    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { data: dailySpec } = useFetchDailySpec(formattedDate);
    const { data: exercisesData } = useFetchExercises(formattedDate);

    const { mutateAsync: createDailySpec } = useCreateDailySpec();
    const { mutateAsync: createExercises } = useCreateExercises(formattedDate);
    const { mutateAsync: updateExercises } = useUpdateExercises(formattedDate);

    if (!exercises.length) return;

    const exercisesTotals = calculateExercisesTotals(exercises);

    const createExercisesData = async (id?: number) => {
        const createData = {
            dailyId: dailySpec?.id || id!,
            entryDate: formattedDate,
            exercise: exercises,
        };

        if (exercisesData) {
            const updatedData = {
                id: exercisesData.id,
                exercise: [...exercisesData.exercise, ...exercises],
            };

            const newData = encodeUpdateExercise({ ...updatedData });

            await updateExercises(newData);
        } else {
            const newData = encodeCreateExercises({ ...createData });

            await createExercises(newData);
        }

        router.push('/home');
    };

    const submitExercises = async () => {
        if (!dailySpec) {
            const dailySpecData = {
                goalId: goalData?.id!,
                entryDate: formattedDate,
                todayWeight: 0,
                mood: null,
                diary: null,
            };

            const createData = encodeCreateDailySpec({ ...dailySpecData });
            const dailyData = await createDailySpec(createData);
            createExercisesData(dailyData.id);
        } else {
            createExercisesData();
        }
    };

    const addExercise = () => {
        onOpen();
        selectExercise(null);
    };

    const openExerciseDetail = (exercise: DecodeExercisesItemType) => {
        selectExercise(exercise);
        onOpen();
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Text bold size="xlg">
                    오늘 한 운동
                </Text>
                <Text bold size="xlg" color="var(--mainHover)">
                    {exercises.length}
                </Text>
            </div>

            {exercises.map((exercise) => (
                <ListRow
                    onClick={() => openExerciseDetail(exercise)}
                    className={styles.exerciseItem}
                    key={exercise.id}
                    left={
                        <div className={styles.exerciseName}>
                            <Text bold size="lg">
                                {exercise.exerciseName}
                            </Text>
                            <Text size="sm" color="var(--grey600)">
                                {exercise.durationMin}분 {EXERCISE_INTENSITY_LABELS[exercise.exerciseIntensity!]}
                            </Text>
                        </div>
                    }
                    right={
                        <div className={styles.action}>
                            <Text bold size="lg">
                                {exercise.caloriesBurned} kcal
                            </Text>
                            <Icons.FillXmark
                                width={13}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    removeExercises(exercise.id);
                                }}
                            />
                        </div>
                    }
                />
            ))}

            <div className={styles.totalCalories}>
                <Text bold size="xlg">
                    {exercisesTotals.caloriesBurned} kcal
                </Text>
            </div>

            <div className={styles.btn}>
                <Button role="round" size="lg" onClick={addExercise}>
                    + 추가하기
                </Button>
                <Button role="round" size="lg" onClick={submitExercises}>
                    저장하기
                </Button>
            </div>
        </div>
    );
};

export default ExerciseAddList;
