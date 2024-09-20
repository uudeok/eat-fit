'use client';

import { useModal } from '@/hooks';
import { ModalType } from './common/Modal/OverlayContainer';
import { useEffect, useState } from 'react';
import UserBasicInfo from './funnel/UserBasicInfo';
import UserGoalInfo from './funnel/UserGoalInfo';
import GoalSuggestion from './funnel/GoalSuggestion';

type StepType = 'basicInfo' | 'goalInfo' | 'suggestion';

const GoalRegister = () => {
    const { onOpen, isOpen } = useModal(ModalType.welcome);
    const [showContent, setShowContent] = useState(false);
    const [step, setStep] = useState<StepType>('basicInfo');

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setShowContent(true);
        }
    }, [isOpen]);

    return (
        <div>
            {showContent && !isOpen && (
                <div>
                    {step === 'basicInfo' && <UserBasicInfo onNext={() => setStep('goalInfo')} />}
                    {step === 'goalInfo' && <UserGoalInfo onNext={() => setStep('suggestion')} />}
                    {step === 'suggestion' && <GoalSuggestion />}
                </div>
            )}
        </div>
    );
};

export default GoalRegister;
