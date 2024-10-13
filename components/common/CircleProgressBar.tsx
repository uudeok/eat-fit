import { getCircleProgressBarColor } from '@/shared/utils';
import styles from '@styles/common/circleProgressbar.module.css';

type Props = {
    total: number;
    current: number;
    size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg';
};

const CircleProgressBar = ({ total, current, size = 'md' }: Props) => {
    const percentage = (current / total) * 100;
    const progressBarColor = getCircleProgressBarColor(percentage);

    return (
        <div className={`${styles.circularProgressBar} ${styles[size]}`}>
            <svg className={styles.circle} viewBox="0 0 36 36">
                <path
                    className={styles.circleBackground}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className={styles.circleProgress}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    style={{
                        strokeDasharray: `${percentage}, 100`,
                        stroke: progressBarColor,
                    }}
                />
            </svg>
            <div className={styles.label}>{Math.round(percentage)}%</div>
        </div>
    );
};

export default CircleProgressBar;
