'use client';

import { useFunnel } from '@/hooks';
import { useState } from 'react';
import { GoalRegisterType, MealPlanInfoType } from '@/service/@types/req.type';
import { useCreateGoal } from '@/service/mutations/useCreateGoal';
import { useRouter } from 'next/navigation';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';
import StepProgress from '@/components/common/StepProgressBar';

const GoalStep = () => {
    const router = useRouter();

    const funnelStep = ['goalIntro', 'basicInfo', 'weightInfo', 'goalInfo', 'mealPlan'] as const;
    const [currentStep, setCurrnetStep] = useState<number>(0);

    const [Funnel, setStep] = useFunnel(funnelStep, {
        initialStep: 'goalIntro',
        stepQueryKey: 'goal-step',
        onStepChange: (step) => {
            setCurrnetStep(funnelStep.indexOf(step));
        },
    });

    const [registerData, setRegisterData] = useState<GoalRegisterType>({
        gender: 'F',
        age: 0,
        height: 0,
        activityLevel: 'moderate',
        weight: 0,
        targetWeight: 0,
        dailyCalories: 0,
        startDate: '',
        endDate: '',
        goalPeriod: 0,
        mealPlan: 'normal',
        dailyCarb: 0,
        dailyFat: 0,
        dailyProtein: 0,
    });

    const { mutate: createGoal } = useCreateGoal();

    const submitGoalData = (goalData: MealPlanInfoType) => {
        try {
            const createData = encodeCreateGoal({ ...registerData, ...goalData });
            createGoal({ ...createData });
            router.push('/home');
        } catch (err) {
            throw err;
        }
    };

    return (
        <Funnel>
            <div className="p-2">{currentStep > 0 && <StepProgress totalSteps={4} currentStep={currentStep} />}</div>
            <Funnel.Step name="goalIntro">
                <GoalIntro
                    onNext={() => {
                        setStep('basicInfo');
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
                        setStep('goalInfo');
                    }}
                />
            </Funnel.Step>
            <Funnel.Step name="goalInfo">
                <GoalCaloriesStep
                    registerData={registerData}
                    onNext={(data) => {
                        setRegisterData((prev) => ({ ...prev, ...data }));
                        setStep('mealPlan');
                    }}
                />
            </Funnel.Step>
            <Funnel.Step name="mealPlan">
                <GoalMealPlanStep
                    onNext={(data) => {
                        submitGoalData(data);
                    }}
                />
            </Funnel.Step>
        </Funnel>
    );
};

export default GoalStep;
