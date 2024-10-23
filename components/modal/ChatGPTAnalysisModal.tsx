'use client';

import styles from '@styles/modal/chatGPTModal.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Modal } from '../common/Modal';
import { ListCol, Text } from '../common';
import { Button } from '../common/Button';
import { useFetchAnalysis, useFetchGoalsByStatus } from '@/service/queries';
import { useCallback, useEffect } from 'react';
import { useReportStore } from '@/shared/store/useReportStore';
import LoadingAnalysis from '../mypage/LoadingAnalysis';
import dayjs from 'dayjs';
import { useCreateAnalysis, useUpdateAnalysis } from '@/service/mutations';

const ChatGPTAnalysisModal = () => {
    const { isOpen, onClose } = useModal(ModalType.chatGPTAnalysis);
    const { progressionRage, weeklyWeight, calories, burnedCalories } = useReportStore();

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { data: analyzedData, isLoading } = useFetchAnalysis();

    const { mutateAsync: createAnalysis, isPending: isWaitingCreate } = useCreateAnalysis();
    const { mutateAsync: updateAnalysis, isPending: isWaitingUpdate } = useUpdateAnalysis();

    const checkAndCreateData = useCallback(async () => {
        const today = dayjs();

        const isDataExpired = analyzedData && dayjs(analyzedData.deadline).isBefore(today, 'day');

        if (!analyzedData && !isLoading && goalData) {
            const createAnalysisData = {
                goalData: goalData,
                progressionRate: progressionRage,
                weeklyWeight: weeklyWeight,
                calories: calories,
                burnedCalories: burnedCalories,
            };

            await createAnalysis(createAnalysisData);
        }

        if (analyzedData && !isLoading && isDataExpired) {
            const updateAnalysisData = {
                id: analyzedData.id,
                goalData: goalData!,
                progressionRate: progressionRage,
                weeklyWeight: weeklyWeight,
                calories: calories,
                burnedCalories: burnedCalories,
            };

            await updateAnalysis(updateAnalysisData);
        }
    }, [
        goalData,
        progressionRage,
        weeklyWeight,
        calories,
        burnedCalories,
        isLoading,
        analyzedData,
        createAnalysis,
        updateAnalysis,
    ]);

    useEffect(() => {
        checkAndCreateData();
    }, [checkAndCreateData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                {isWaitingCreate || isLoading || isWaitingUpdate ? (
                    <LoadingAnalysis />
                ) : (
                    <div>
                        <div className={styles.header}>
                            <Text bold size="xxlg">
                                🎯 분석한 내용을 알려드릴게요
                            </Text>
                        </div>

                        <div className={styles.anaylsis}>
                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🌟 목표 도달 가능성은?
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.possibility}>
                                        <Text bold size="xlg" color="var(--blue800)">
                                            {analyzedData?.possibility}
                                        </Text>
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🧐 평가
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.evaluates}>
                                        <Text bold color="var(--grey800)">
                                            {analyzedData?.evaluates}
                                        </Text>
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        🍯 꿀팁
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.tips}>
                                        {analyzedData?.tips.map((tip, idx) => (
                                            <Text key={idx} bold color="var(--grey800)">
                                                {idx + 1}. {tip}
                                            </Text>
                                        ))}
                                    </div>
                                }
                            />

                            <ListCol
                                top={
                                    <Text bold size="xlg">
                                        💪 힘내세용!
                                    </Text>
                                }
                                bottom={
                                    <div className={styles.cheering}>
                                        <Text bold color="var(--grey800)">
                                            {analyzedData?.cheering}
                                        </Text>
                                    </div>
                                }
                            />
                        </div>

                        <Button role="round" onClick={onClose}>
                            확인!
                        </Button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ChatGPTAnalysisModal;
