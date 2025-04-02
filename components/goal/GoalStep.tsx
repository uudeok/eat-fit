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
import { BasicInfoType, GoalCaloriesInfoType, MealPlanInfoType, WeightInfoType } from '@/service/@types';
import { useGoalSotre } from '@/shared/store/useGoalStore';

const startPage = 1;

const GoalStep = () => {
    const funnelStep = ['goalIntro', 'basicInfo', 'weightInfo', 'caloriesInfo', 'mealPlan', 'goalRegister'] as const;
    type FunnelStep = (typeof funnelStep)[number];

    const { data, setData } = useGoalSotre();

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
                    setData(data);
                    setStep('weightInfo');
                },
            },
        },
        {
            name: 'weightInfo',
            component: GoalWeightInfoStep,
            props: {
                onNext: (data: WeightInfoType) => {
                    setData(data);
                    setStep('caloriesInfo');
                },
            },
        },
        {
            name: 'caloriesInfo',
            component: GoalCaloriesStep,
            props: {
                onNext: (data: GoalCaloriesInfoType) => {
                    setData(data);
                    setStep('mealPlan');
                },
            },
        },
        {
            name: 'mealPlan',
            component: GoalMealPlanStep,
            props: {
                onNext: (data: MealPlanInfoType) => {
                    setData(data);
                    setStep('goalRegister');
                },
            },
        },
        {
            name: 'goalRegister',
            component: GoalRegister,
        },
    ];

    const [Funnel, setStep, FunnelGraph, FunnelEditor] = useFunnel(steps, {
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
            {currentStep >= startPage && <FunnelEditor data={data} setData={setData} />}
        </>
    );
};

export default GoalStep;
