'use client';

import { useState } from 'react';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';
import { StepData, useFunnel } from '@/hooks/useFunnel';
import StepProgress from '@/components/common/StepProgressBar';
import { BasicInfoType, GoalCaloriesInfoType, MealPlanInfoType, WeightInfoType } from '@/service/@types';
import GoalRegister from './GoalRegister';

const GoalStep = () => {
    const funnelStep = ['goalIntro', 'basicInfo', 'weightInfo', 'caloriesInfo', 'mealPlan', 'goalRegister'];

    const [registerData, setRegisterData] = useState({});
    const [currentStep, setCurrnetStep] = useState<number>(0);

    const steps = [
        {
            name: 'goalIntro',
            component: GoalIntro,
            props: {
                onNext: () => setStep('basicInfo'),
            },
        },
        {
            name: 'basicInfo',
            component: GoalBasicInfoStep,
            props: {
                onNext: (data: BasicInfoType) => {
                    setRegisterData((prev) => ({ ...prev, ...data }));
                    setStep('weightInfo');
                },
            },
        },
        {
            name: 'weightInfo',
            component: GoalWeightInfoStep,
            props: {
                onNext: (data: WeightInfoType) => {
                    setRegisterData((prev) => ({ ...prev, ...data }));
                    setStep('caloriesInfo');
                },
            },
        },
        {
            name: 'caloriesInfo',
            component: GoalCaloriesStep,
            props: {
                registerData,
                onNext: (data: GoalCaloriesInfoType) => {
                    setRegisterData((prev) => ({ ...prev, ...data }));
                    setStep('mealPlan');
                },
            },
        },
        {
            name: 'mealPlan',
            component: GoalMealPlanStep,
            props: {
                onNext: (data: MealPlanInfoType) => {
                    setRegisterData((prev) => ({ ...prev, ...data }));
                    setStep('goalRegister');
                },
            },
        },
        {
            name: 'goalRegister',
            component: GoalRegister,
            props: {
                registerData,
            },
        },
    ] as StepData<string>[];

    const [Funnel, setStep, FunnelGraph] = useFunnel(steps, {
        initialStep: 'goalIntro',
        stepQueryKey: 'goal-step',
        onStepChange: (step) => {
            setCurrnetStep(funnelStep.indexOf(step));
        },
    });

    return (
        <>
            <div className="p-2">
                {currentStep > 0 && <StepProgress totalSteps={funnelStep.length - 2} currentStep={currentStep} />}
            </div>
            <Funnel />
            {currentStep > 0 && <FunnelGraph />}
        </>
    );
};

export default GoalStep;
