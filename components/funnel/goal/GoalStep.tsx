'use client';

import { useFunnel } from '@/hooks';
import { useState } from 'react';
import { GoalRegisterType, MealPlanInfoType } from '@/service/@types/req.type';
import { useCreateGoal } from '@/service/mutations/useCreateGoal';
import { useRouter } from 'next/navigation';
import { removeLocalStorageItem } from '@/shared/utils';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';
import { encodeCreateGoal } from '@/service/mappers/goalMapper';

const GoalStep = () => {
    const router = useRouter();
    const [Funnel, setStep] = useFunnel(['goalIntro', 'basicInfo', 'weightInfo', 'goalInfo', 'mealPlan'] as const, {
        initialStep: 'goalIntro',
        stepQueryKey: 'goal-step',
        // onStepChange: (step) => console.log(`Current step: ${step}`),
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
            <Funnel.Step name="goalIntro">
                <GoalIntro
                    onNext={() => {
                        removeLocalStorageItem('goalData');
                        removeLocalStorageItem('goalCalorie');
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
