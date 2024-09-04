'use client';

import styles from '../styles/component/todaySummary.module.css';
import CircleText from './common/CircleText';
import ProgressBar from './common/ProgressBar';
import Text from './common/Text';
import TodayStatus from './TodayStatus';

const TodaySummary = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.progress}>
                <Text size="xxlg" bold color="white">
                    850 / 1600 Kcal
                </Text>

                <ProgressBar current={850} total={1600} />
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
                <TodayStatus />
            </div>
        </div>
    );
};

export default TodaySummary;
