'use client';

import styles from '@styles/component/todayExercises.module.css';
import Image from 'next/image';
import { Text, List, Penel, ListRow, ListCol } from './common';
import { Button } from './common/Button';
import { EXERCISE_INTENSITY_LABELS, ExerciseType, Exercises } from '@/constants';
import { calculateExerciseTotals } from '@/shared/utils/exercise';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getExerciseAddPage } from '@/shared/utils';
import { useModal } from '@/hooks';
import useExerciseItemStore from '@/shared/store/useExerciseItemStore';

const TodayExercises = () => {
    const router = useRouter();
    const { onOpen } = useModal('exerciseDetail');
    const { setSelectedExerciseItem } = useExerciseItemStore();

    const totals = useMemo(() => calculateExerciseTotals(Exercises), [Exercises]);

    const EXERCISES_SUMMARY = [
        { label: '총 운동 시간', value: totals.totalDuration, unit: '분' },
        { label: '총 소모량', value: totals.totalCalories, unit: 'kcal' },
    ];

    const handleExerciseItem = (e: ExerciseType) => {
        setSelectedExerciseItem(e);
        onOpen();
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
                <List>
                    <ListRow
                        left={
                            <Text bold size="xlg">
                                오늘 한 운동
                            </Text>
                        }
                        right={
                            <Text bold size="xxlg" color="var(--green700)">
                                {Exercises.exercise.length}
                            </Text>
                        }
                    />
                </List>

                <List className={styles.exerciseList}>
                    {Exercises.exercise.map((e) => (
                        <div key={e.id} className={styles.exerciseItem} onClick={() => handleExerciseItem(e)}>
                            <ListRow
                                left={
                                    <div className={styles.exerciseName}>
                                        <Text bold>{e.exercise_name}</Text>
                                        <Text size="sm">
                                            {e.duration_minutes}분 {EXERCISE_INTENSITY_LABELS[e.exercise_intensity]}
                                        </Text>
                                    </div>
                                }
                                right={<Text bold>{e.calories_burned} Kcal</Text>}
                            />

                            <Penel padding="15px">
                                <Text size="sm">{e.content}</Text>
                            </Penel>
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
