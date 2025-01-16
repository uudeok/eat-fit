'use client';

import { useContext, useState } from 'react';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';
import { StepData, useFunnel } from '@/hooks/useFunnel';
import StepProgress from '@/components/common/StepProgressBar';
import {
    BasicInfoType,
    GoalCaloriesInfoType,
    GoalRegisterType,
    MealPlanInfoType,
    WeightInfoType,
} from '@/service/@types';
import GoalRegister from './GoalRegister';
import { FunnelContext } from '@/shared/context/FunnelProvider';

const GoalStep = () => {
    const funnelStep = ['goalIntro', 'basicInfo', 'weightInfo', 'caloriesInfo', 'mealPlan', 'goalRegister'] as const;
    type FunnelStep = (typeof funnelStep)[number];

    const { setRegisterData, registerData } = useContext(FunnelContext);
    const [currentStep, setCurrnetStep] = useState<number>(0);

    const steps: StepData<FunnelStep>[] = [
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
                    setRegisterData((prev: GoalRegisterType) => ({ ...prev, ...data }));
                    setStep('weightInfo');
                },
            },
        },
        {
            name: 'weightInfo',
            component: GoalWeightInfoStep,

            props: {
                onNext: (data: WeightInfoType) => {
                    setRegisterData((prev: GoalRegisterType) => ({ ...prev, ...data }));
                    setStep('caloriesInfo');
                },
            },
        },
        {
            name: 'caloriesInfo',
            component: GoalCaloriesStep,
            props: {
                onNext: (data: GoalCaloriesInfoType) => {
                    setRegisterData((prev: GoalRegisterType) => ({ ...prev, ...data }));
                    setStep('mealPlan');
                },
            },
        },
        {
            name: 'mealPlan',
            component: GoalMealPlanStep,
            props: {
                onNext: (data: MealPlanInfoType) => {
                    setRegisterData((prev: GoalRegisterType) => ({ ...prev, ...data }));
                    setStep('goalRegister');
                },
            },
        },
        {
            name: 'goalRegister',
            component: GoalRegister,
        },
    ];

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
