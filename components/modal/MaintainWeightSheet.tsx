import styles from '@styles/modal/maintainWeightSheet.module.css';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Text } from '../common';
import { Button } from '../common/Button';

const MaintainWeightSheet = () => {
    const { isOpen, onClose } = useModal(ModalType.maintainWeight);

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <div className={styles.content}>
                    <Text bold size="xxlg">
                        체중 유지를 원하시는군요?
                    </Text>

                    <Text size="md" className={styles.description}>
                        체중 유지를 목표로 설정하면
                        <br />
                        <strong>칼로리</strong> 및 <strong>목표 날짜</strong> 를 수정할 수 없습니다.
                        <br />
                        <br />
                        목표 기간은 <strong>60일</strong> 로 자동 설정됩니다.
                        <br />
                        몸무게를 유지하기 위해 잇핏이 함께할게요!
                    </Text>
                </div>

                <Button role="confirm" size="lg" onClick={onClose}>
                    확인
                </Button>
            </div>
        </BottomSheet>
    );
};

export default MaintainWeightSheet;
