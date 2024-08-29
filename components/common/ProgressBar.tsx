import styles from '../../styles/common/progressbar.module.css';

type Props = {
    total: number;
    current: number;
};

const ProgressBar = ({ total, current }: Props) => {
    const percentage = (current / total) * 100;

    const getProgressBarColor = (percentage: number) => {
        if (percentage <= 30) return 'linear-gradient(to right, #a1c4fd, #c2e9fb)'; // 부드러운 블루
        if (percentage <= 70) return 'linear-gradient(to right, #fbc2eb, #a6c0fe)'; // 부드러운 오렌지와 금색
        return 'linear-gradient(to right, #f79caa, #f2a65a)'; // 부드러운 레드와 로즈
    };

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
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

// const getProgressBarColor = (percentage: number) => {
//     if (percentage <= 30) return 'linear-gradient(to right, #00bfff, #1e90ff)';
//     if (percentage <= 70) return 'linear-gradient(to right, #ff8c00, #ff4500)';
//     return 'linear-gradient(to right, #ff0000, #BB0A1E)';
// };
