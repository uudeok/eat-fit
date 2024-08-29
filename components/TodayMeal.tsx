import styles from '../styles/component/todayMeal.module.css';
import ProgressBar from './common/ProgressBar';
import Text from './common/Text';

const TodayMeal = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.progress}>
                <Text size="xxlg" bold color="white">
                    850 / 1600 Kcal
                </Text>

                <ProgressBar current={750} total={1600} />
            </div>
        </div>
    );
};

export default TodayMeal;
