import styles from '@styles/component/status.module.css';
import { useModal } from '@/hooks';
import { Text } from '../common';
import { ModalType } from '../common/Modal/Modals';

const WeightStatus = () => {
    const { onOpen } = useModal(ModalType.todayWeight);

    return (
        <div className={styles.stateItem} onClick={onOpen}>
            <Text color="var(--mainColorDk)" bold size="lg">
                몸무게
            </Text>
            <Text color="white" bold size="xlg">
                60.05 kg
            </Text>
        </div>
    );
};

export default WeightStatus;
