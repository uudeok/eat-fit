import { getProgressBarColor } from '@/shared/utils';
import styles from '@styles/common/progressbar.module.css';

type Props = {
    total: number;
    current: number;
    size?: 'xsm' | 'sm' | 'md' | 'lg';
};

const ProgressBar = ({ total, current, size = 'md' }: Props) => {
    const percentage = (current / total) * 100;

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
                <div
                    className={`${styles.progressFill} ${styles[size]}`}
                    style={{
                        width: `${percentage}%`,
                        background: getProgressBarColor(percentage),
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;
