'use client';

import Image from 'next/image';
import styles from '../styles/component/dailySummary.module.css';
import CircleText from './common/CircleText';
import ProgressBar from './common/ProgressBar';
import Text from './common/Text';
import Emotion from './common/Emotions';

const DailySummary = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.progress}>
                <Text size="xxlg" bold color="white">
                    850 / 1600 Kcal
                </Text>

                <ProgressBar current={880} total={1600} />
            </div>

            <div className={styles.record}>
                <div className={styles.recordItem}>
                    <CircleText text="탄" size={24} background="var(--mainColorDk)" />
                    <Text color="white" bold size="lg">
                        15g
                    </Text>
                </div>
                <div className={styles.recordItem}>
                    <CircleText text="단" size={24} background="var(--orange300)" />
                    <Text color="white" bold size="lg">
                        20g
                    </Text>
                </div>
                <div className={styles.recordItem}>
                    <CircleText text="지" size={24} background="var(--red300)" />
                    <Text color="white" bold size="lg">
                        8g
                    </Text>
                </div>
            </div>

            <div className={styles.mode}>
                <div className={styles.infoContainer}>
                    <div className={styles.infoItem}>
                        <Text color="var(--mainColorDk)" bold size="lg">
                            오늘의 기분
                        </Text>
                        <Image src="/emotion_fill_good.png" width="30" height="30" alt="emotion_good" />
                    </div>

                    <div className={styles.infoItem}>
                        <Text color="var(--mainColorDk)" bold size="lg">
                            몸무게
                        </Text>
                        <Text color="white" bold size="lg">
                            0.00 kg
                        </Text>
                    </div>

                    <div className={styles.infoItem}>
                        <Text color="var(--mainColorDk)" bold size="lg">
                            소모한 칼로리
                        </Text>
                        <Text color="white" bold size="lg">
                            0 Kcal
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailySummary;
