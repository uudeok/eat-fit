'use client';

import styles from '../../styles/modal/todayweightSheet.module.css';
import Text from '../common/Text';
import BottomSheet from '../common/BottomSheet';
import Button from '../common/Button';
import InputBase from '../common/Input';
import Label from '../common/Label';
import { useInput, useModal } from '@/hooks';
import { ModalType } from '../common/Modals';

const TodayWeightSheet = () => {
    const { isOpen, onClose } = useModal(ModalType.todayWeight);
    const [value, onChangeInput] = useInput({
        type: 'weight',
        integerMaxLength: 3,
    });

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <Text bold size="xxlg">
                    오늘 체중 입력
                </Text>
                <Label className={styles.label}>
                    <InputBase placeholder="00.00 kg" value={value} onChange={onChangeInput} />
                </Label>

                <Button role="confirm" disabled={!value}>
                    확인
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TodayWeightSheet;
