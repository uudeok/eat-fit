'use client';

import styles from '@styles/modal/chatGPTModal.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Modal } from '../common/Modal';
import { useFetchChatGPT, useFetchGoalsByStatus } from '@/service/queries';
import { ListCol, LoadingBar, Text } from '../common';
import LoadingAnalysis from '../mypage/LoadingAnalysis';
import { useEffect, useState } from 'react';
import { Button } from '../common/Button';

const weeklyWeight = [
    { weight: 62.5 },
    { weight: 62.5 },
    { weight: 62.5 },
    { weight: 62.4 },
    { weight: 62.5 },
    { weight: 61.9 },
    { weight: 61.7 },
];

const burnedCalories = [0, null, 120, 395, 0, 297, 0];
const calories = [10, null, 152, 889, 507, 1401, 0];

type AnalyzeDataType = {
    possibility: string;
    tips: string[];
    cheering: string;
    evaluates: string;
};

const ChatGPTAnalysisModal = () => {
    const { isOpen, onClose } = useModal(ModalType.chatGPTAnalysis);
    const { data: goalData } = useFetchGoalsByStatus('progress');

    const [data, setData] = useState<AnalyzeDataType>();

    if (!goalData) return <LoadingBar />;

    const { data: analysisData, isLoading } = useFetchChatGPT({
        goalData: goalData,
        weeklyWeight: weeklyWeight,
        burnedCalories: burnedCalories,
        calories: calories,
        progressionRate: 5,
    });

    useEffect(() => {
        if (analysisData) {
            setData(JSON.parse(analysisData));
        }
    }, [analysisData]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                {isLoading ? (
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
                                            {data?.possibility}
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
                                            {data?.evaluates}
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
                                        {data?.tips.map((tip, idx) => (
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
                                            {data?.cheering}
                                        </Text>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                )}

                <Button role="round" onClick={onClose}>
                    확인!
                </Button>
            </div>
        </Modal>
    );
};

export default ChatGPTAnalysisModal;
