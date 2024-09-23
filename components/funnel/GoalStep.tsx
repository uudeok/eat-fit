'use client';

import { useFunnel } from '@/hooks';
import { useState } from 'react';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalSuggestion from './GoalSuggestion';
import { GoalRegisterType } from '@/service/@types/req.type';
import GoalIntro from './GoalIntro';

const GoalStep = () => {
    const [Funnel, setStep] = useFunnel(['goalIntro', 'basicInfo', 'weightInfo', 'goalSuggestion'] as const, {
        initialStep: 'goalIntro',
        stepQueryKey: 'goal-step',
        onStepChange: (step) => console.log(`Current step: ${step}`),
    });

    const [registerData, setRegisterData] = useState<GoalRegisterType>({
        gender: 'F',
        age: 0,
        height: 0,
        activity_level: 'moderate',
        weight: 0,
        target_weight: 0,
        daily_calories: 0,
        goal_start_date: new Date(),
        goal_end_date: new Date(),
        goal_period: 0,
    });

    console.log('최종', registerData);

    return (
        <Funnel>
            <Funnel.Step name="goalIntro">
                <GoalIntro
                    onNext={() => {
                        setStep('basicInfo');

                        localStorage.removeItem('goalData');
                    }}
                />
            </Funnel.Step>

            <Funnel.Step name="basicInfo">
                <GoalBasicInfoStep
                    onNext={(data) => {
                        setRegisterData((prev) => ({ ...prev, ...data }));
                        setStep('weightInfo');
                    }}
                />
            </Funnel.Step>

            <Funnel.Step name="weightInfo">
                <GoalWeightInfoStep
                    onNext={(data) => {
                        setRegisterData((prev) => ({ ...prev, ...data }));
                        setStep('goalSuggestion');
                    }}
                />
            </Funnel.Step>

            <Funnel.Step name="goalSuggestion">
                <GoalSuggestion
                    registerData={registerData}
                    onNext={(data) => {
                        setRegisterData((prev) => ({ ...prev, ...data }));
                    }}
                />
            </Funnel.Step>
        </Funnel>
    );
};

export default GoalStep;
