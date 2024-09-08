'use client';

import styles from '@styles/component/todayExercises.module.css';
import Image from 'next/image';
import Text from './common/Text';
import Button from './common/Button';
import { EXERCISE_INTENSITY_LABELS, Exercises } from '@/constants';

const TodayExercises = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.summary}>
                <Image src="/exercise_jump.png" alt="jump rope icon" width={140} height={120} />
                <div className={styles.summaryLayout}>
                    <div className={styles.summaryContent}>
                        <Text bold size="lg" color="white">
                            총 운동 시간
                        </Text>
                        <Text color="white" bold size="xxlg">
                            25 분
                        </Text>
                    </div>

                    <div className={styles.summaryContent}>
                        <Text bold size="lg" color="white">
                            총 소모량
                        </Text>
                        <Text color="white" bold size="xxlg">
                            221 Kcal
                        </Text>
                    </div>
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

                <ul className={styles.exerciseList}>
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
                </ul>
            </div>
            <Button className={styles.addButton}>추가</Button>
        </div>
    );
};

export default TodayExercises;
