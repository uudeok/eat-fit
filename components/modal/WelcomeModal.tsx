import styles from '@styles/modal/welcomeModal.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Text } from '../common';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

const WelcomeModal = () => {
    const { isOpen, onClose } = useModal(ModalType.welcome);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <Text bold size="xlg">
                    잇-핏에 오신 걸 환영해요! 🥰
                </Text>
                <Text color="var(--grey500)">건강한 관리를 위해 잇핏이 도와드릴게요</Text>

                <Button role="confirm" size="lg" onClick={onClose}>
                    목표 설정하기
                </Button>
            </div>
        </Modal>
    );
};

export default WelcomeModal;
