import useModal from '@/hooks/useModal';
import Text from '../common/Text';
import BottomSheet from '../common/BottomSheet';
import Modal from '../common/Modal';

const TodayWeightSheet = () => {
    const { isOpen, onClose } = useModal('몸무게');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <Text bold>몸무게</Text>
            </div>
        </Modal>
    );
};

export default TodayWeightSheet;
