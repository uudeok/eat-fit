import useModal from '@/hooks/useModal';
import styles from '../../styles/component/status.module.css';
import Text from '../common/Text';

const WeightStatus = () => {
    const { onOpen } = useModal('몸무게');

    return (
        <div className={styles.stateItem} onClick={onOpen}>
            <Text color="var(--mainColorDk)" bold size="lg">
                몸무게
            </Text>
            <Text color="white" bold size="lg">
                0.00 kg
            </Text>
        </div>
    );
};

export default WeightStatus;
