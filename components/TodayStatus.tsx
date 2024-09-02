import styles from '../styles/component/todayStatus.module.css';
import BurnedCalorieStatus from './status/BurnedCalorieStatus';
import ModeStatus from './status/ModeStatus';
import WeightStatus from './status/WeightStatus';

const TodayStatus = () => {
    return (
        <div className={styles.layout}>
            <ModeStatus />

            <WeightStatus />

            <BurnedCalorieStatus />
        </div>
    );
};

export default TodayStatus;
