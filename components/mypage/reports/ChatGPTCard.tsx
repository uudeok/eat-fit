'use client';

import { useModal } from '@/hooks';
import { Text } from '../../common';
import { Button } from '../../common/Button';
import { ModalType } from '../../common/Modal/OverlayContainer';
import Card from '@/components/common/Card';

const ChatGPTCard = () => {
    const { onOpen } = useModal(ModalType.chatGPTAnalysis);

    const handleAnalysisData = () => {
        onOpen();
    };

    return (
        <Card>
            <div className="flex flex-col items-center justify-center p-6 gap-4 mt-4">
                <Text color="white" bold size="xlg">
                    현재 잘 하고 있는지 궁금하다면 ?
                </Text>

                <Button role="round" onClick={handleAnalysisData} size="lg">
                    💡 AI 분석 하기
                </Button>
            </div>
        </Card>
    );
};

export default ChatGPTCard;
