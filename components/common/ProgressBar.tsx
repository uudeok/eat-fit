import styles from '@styles/common/progressbar.module.css';

type Props = {
    total: number;
    current: number;
    size?: 'xsm' | 'sm' | 'md' | 'lg';
};

const ProgressBar = ({ total, current, size = 'md' }: Props) => {
    const percentage = (current / total) * 100;

    const getProgressBarColor = (percentage: number) => {
        if (percentage <= 30) return 'linear-gradient(to right, #a1c4fd, #c2e9fb)';
        if (percentage <= 70) return 'linear-gradient(to right, #fbc2eb, #a6c0fe)';
        return 'linear-gradient(to right, #f79caa, #f2a65a)';
    };

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
