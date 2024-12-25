'use client';

import styles from '@styles/modal/chatGPTModal.module.css';
import { useModal, useCache } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Modal } from '../common/Modal';
import { ListCol, Text } from '../common';
import { Button } from '../common/Button';
import { useFetchGoalsByStatus } from '@/service/queries';
import { useCallback, useEffect, useState } from 'react';
import { useReportStore } from '@/shared/store/useReportStore';
import LoadingAnalysis from '../mypage/reports/LoadingAnalysis';
import { useCreateAnalysis } from '@/service/mutations';
import { DecodeAnalysis } from '@/service/mappers/analysisMapper';
import { DecodeGoalType } from '@/service/mappers/goalMapper';
import { COOKIE_KEYS } from '@/constants';

const ChatGPTAnalysisModal = () => {
    const cookie = useCache('cookie');
    const { isOpen, onClose } = useModal(ModalType.chatGPTAnalysis);
    const { progressionRate, weeklyWeight, calories, burnedCalories } = useReportStore();

    const { data: goalData } = useFetchGoalsByStatus('progress') as { data: DecodeGoalType };
    const { mutateAsync: createAnalysis, isPending: isCreating } = useCreateAnalysis();

    const storedAnalysisData: DecodeAnalysis | null = cookie.getItem(COOKIE_KEYS.ANALYSIS);
    const isAnalysisCookieValid: boolean = cookie.isCookieValid(COOKIE_KEYS.ANALYSIS);

    const [analysisData, setAnalysisData] = useState<DecodeAnalysis>();

    const saveAnalysisToCookie = (newData: DecodeAnalysis) => {
        cookie.setItem(COOKIE_KEYS.ANALYSIS, newData, { expires: newData.deadline });
    };

    const fetchAndSaveNewAnalysis = async () => {
        const newAnalysisData = {
            goalData,
            progressionRate,
            weeklyWeight,
            calories,
            burnedCalories,
        };

        const newData = await createAnalysis(newAnalysisData);

        saveAnalysisToCookie(newData);
    };

    const initializeAnalysis = useCallback(async () => {
        if (!goalData || isCreating) return;

        if (storedAnalysisData && isAnalysisCookieValid) {
            setAnalysisData(storedAnalysisData);
        } else {
            await fetchAndSaveNewAnalysis();
        }
    }, [goalData, isCreating, storedAnalysisData, isAnalysisCookieValid]);

    useEffect(() => {
        initializeAnalysis();
    }, [initializeAnalysis]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                {isCreating ? (
                    <LoadingAnalysis />
                ) : (
                    <div>
                        <div className={styles.header}>
                            <Text bold size="xxlg">
                                🎯 분석한 내용을 알려드릴게요
                            </Text>
                            <Text size="sm">분석은 일주일 간격으로 업데이트 됩니다‼️</Text>
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
                                            {analysisData?.possibility}
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
                                            {analysisData?.evaluates}
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
                                        {analysisData?.tips.map((tip, idx) => (
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
                                            {analysisData?.cheering}
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
