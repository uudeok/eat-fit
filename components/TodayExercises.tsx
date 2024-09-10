'use client';

import styles from '@styles/component/todayExercises.module.css';
import Image from 'next/image';
import Text from './common/Text';
import Button from './common/Button';
import { EXERCISE_INTENSITY_LABELS, Exercises } from '@/constants';
import { calculateExerciseTotals } from '@/shared/utils/exercise';
import { useMemo } from 'react';
import List from './common/List';
import { useRouter } from 'next/navigation';
import { getExerciseAddPage } from '@/shared/utils';

const TodayExercises = () => {
    const router = useRouter();
    const totals = useMemo(() => calculateExerciseTotals(Exercises), [Exercises]);

    const EXERCISES_SUMMARY = [
        { label: '총 운동 시간', value: totals.totalDuration, unit: '분' },
        { label: '총 소모량', value: totals.totalCalories, unit: 'kcal' },
    ];

    return (
        <div className={styles.layout}>
            <div className={styles.summary}>
                <Image src="/exercise_jump.png" alt="jump rope icon" width={140} height={120} />

                <div className={styles.summaryLayout}>
                    {EXERCISES_SUMMARY.map((summary) => (
                        <div className={styles.summaryContent} key={summary.label}>
                            <Text color="white" bold size="lg">
                                {summary.label}
                            </Text>
                            <Text color="white" bold size="xxlg">
                                {summary.value}
                                {summary.unit}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.exercises}>
                <div className={styles.headerGroup}>
                    <Text bold size="xlg">
                        오늘 한 운동
                    </Text>
                    <Text bold size="xxlg" color="var(--green700)">
                        {Exercises.exercise.length}
                    </Text>
                </div>

                <List className={styles.exerciseList}>
                    {Exercises.exercise.map((e) => (
                        <li key={e.id} className={styles.exerciseItem}>
                            <div className={styles.exerciseMain}>
                                <Text bold>{e.exercise_name}</Text>
                                <div className={styles.exerciseActions}>
                                    <Text bold>{e.calories_burned} Kcal</Text>
                                    <Button className={styles.deleteButton}>X</Button>
                                </div>
                            </div>
                            <Text size="sm">
                                {e.duration_minutes}분 {EXERCISE_INTENSITY_LABELS[e.exercise_intensity]}
                            </Text>
                            <div className={styles.exerciseContent}>
                                <Text size="sm">{e.content}</Text>
                            </div>
                        </li>
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
