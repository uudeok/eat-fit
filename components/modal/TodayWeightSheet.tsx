'use client';

import styles from '@styles/modal/todayweightSheet.module.css';
import { useModal } from '@/hooks';
import { Text } from '../common';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/Modals';
import { Button } from '../common/Button';
import SheetHeader from '../layout/SheetHeader';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';

type FormValues = {
    today_weight: null | number;
};

const TodayWeightSheet = () => {
    const { isOpen, onClose } = useModal(ModalType.todayWeight);
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            today_weight: null,
        },
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content="오늘 체중 입력" onClose={onClose} />

            <form onSubmit={onSubmit} className={styles.layout}>
                <div className={styles.inputWithUnit}>
                    <Input register={register} name="today_weight" placeholder="00.0" type="number" />
                    <Text size="lg" bold>
                        kg
                    </Text>
                </div>
                <Button role="confirm" size="lg">
                    저장
                </Button>
            </form>
        </BottomSheet>
    );
};

export default TodayWeightSheet;
