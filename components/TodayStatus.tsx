import styles from '@styles/component/todayStatus.module.css';
import BurnedCalorieStatus from './status/BurnedCalorieStatus';
import MoodStatus from './status/MoodStatus';
import WeightStatus from './status/WeightStatus';

const TodayStatus = () => {
    return (
        <div className={styles.layout}>
            <MoodStatus />

            <WeightStatus />

            <BurnedCalorieStatus />
        </div>
    );
};

export default TodayStatus;
