'use client';

import styles from '@styles/modal/goalCompletionModal.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useFetchGoalsByStatus } from '@/service/queries';
import { Modal } from '../common/Modal';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { ListCol, Text } from '../common';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';

const GoalCompletionModal = () => {
    const { isOpen, onClose, onOpen } = useModal(ModalType.goalCompletionModal);
    const { data: goalData } = useFetchGoalsByStatus('progress');
    const router = useRouter();

    useEffect(() => {
        // const dDay = true;
        const dDay = dayjs().startOf('day').isSame(dayjs(goalData?.endDate).startOf('day'));
        console.log(dDay);
        if (dDay) {
            onOpen();
        }
    }, [goalData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <ListCol
                    top={
                        <Text bold size="xxlg">
                            축하합니다🎉🥳👏
                        </Text>
                    }
                    bottom={<p className={styles.content}>목표일까지의 여정을 성공적으로 마친 것을 축하합니다!</p>}
                />

                <Button role="confirm" onClick={() => router.push('/')}>
                    확인하러가기
                </Button>
            </div>
        </Modal>
    );
};

export default GoalCompletionModal;
