import styles from '../../styles/component/status.module.css';
import Text from '../common/Text';

const BurnedCalorieStatus = () => {
    return (
        <div className={styles.stateItem}>
            <Text color="var(--mainColorDk)" bold size="lg">
                소모한 칼로리
            </Text>
            <Text color="white" bold size="xlg">
                0 Kcal
            </Text>
        </div>
    );
};

export default BurnedCalorieStatus;
