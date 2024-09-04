'use client';

import styles from '../styles/component/todayExercises.module.css';
import Image from 'next/image';
import Text from './common/Text';
import Button from './common/Button';
import { EXERCISE_INTENSITY_LABELS } from '@/constants';

const EXERCISE_LIST = [
    {
        id: 1,
        exercise_name: '수영 (자유형)',
        exercise_intensity: 1,
        duration_minutes: 25,
        calories_burned: 221,
        content: '자유형으로 50m를 10세트',
        start_time: '14:00',
    },
    {
        id: 2,
        exercise_name: '수영 (배영)',
        exercise_intensity: 0,
        duration_minutes: 5,
        calories_burned: 34,
        content: '배영 50m를 1세트',
        start_time: '14:00',
    },
    {
        id: 3,
        exercise_name: '수영 (접영)',
        exercise_intensity: 2,
        duration_minutes: '10',
        calories_burned: 179,
        content: '접영 50m를 2세트했다. 너무 힘들었지만 뿌듯했다 다음에는 100m 도전해야지',
        start_time: '14:00',
    },
];

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
                        {EXERCISE_LIST.length}
                    </Text>
                </div>

                <ul className={styles.exerciseList}>
                    {EXERCISE_LIST?.map((e) => (
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
