'use client';

import { useState } from 'react';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';
import { StepData, useFunnel } from '@/hooks/useFunnel';
import StepProgress from '@/components/common/StepProgressBar';
import GoalRegister from './GoalRegister';
import {
    BasicInfoType,
    GoalCaloriesInfoType,
    GoalRegisterType,
    MealPlanInfoType,
    WeightInfoType,
} from '@/service/@types';
import { createStore } from '@/shared/store/useDataStore';

export const useGoalStore = createStore<GoalRegisterType>({} as GoalRegisterType, 'goal-storage');
const startPage = 1;

const GoalStep = () => {
    const funnelStep = ['goalIntro', 'basicInfo', 'weightInfo', 'caloriesInfo', 'mealPlan', 'goalRegister'] as const;
    type FunnelStep = (typeof funnelStep)[number];

    const [currentStep, setCurrnetStep] = useState<number>(0);

    const { data: registerData, setData: setRegisterData } = useGoalStore();
    console.log('goal-Step : ', registerData);

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
                    setRegisterData(data);
                    setStep('weightInfo');
                },
            },
        },
        {
            name: 'weightInfo',
            component: GoalWeightInfoStep,
            props: {
                onNext: (data: WeightInfoType) => {
                    setRegisterData(data);
                    setStep('caloriesInfo');
                },
            },
        },
        {
            name: 'caloriesInfo',
            component: GoalCaloriesStep,
            props: {
                onNext: (data: GoalCaloriesInfoType) => {
                    setRegisterData(data);
                    setStep('mealPlan');
                },
            },
        },
        {
            name: 'mealPlan',
            component: GoalMealPlanStep,
            props: {
                onNext: (data: MealPlanInfoType) => {
                    setRegisterData(data);
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
                {currentStep >= startPage && (
                    <StepProgress totalSteps={funnelStep.length - 2} currentStep={currentStep} />
                )}
            </div>
            <Funnel />
            {currentStep >= startPage && <FunnelGraph />}
        </>
    );
};

export default GoalStep;
