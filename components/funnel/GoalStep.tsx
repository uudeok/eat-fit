'use client';

import { useFunnel } from '@/hooks';
import { useState } from 'react';
import { GoalRegisterType, GoalCaloriesInfoType, MealPlanInfoType } from '@/service/@types/req.type';
import { useCreateGoal } from '@/hooks/mutations/useCreateGoal';
import { useRouter } from 'next/navigation';
import { removeLocalStorageItem } from '@/shared/utils';
import GoalIntro from './GoalIntro';
import GoalBasicInfoStep from './GoalBasicInfoStep';
import GoalWeightInfoStep from './GoalWeightInfoStep';
import GoalCaloriesStep from './GoalCaloriesStep';
import GoalMealPlanStep from './GoalMealPlanStep';

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
        activity_level: 'moderate',
        weight: 0,
        target_weight: 0,
        daily_calories: 0,
        goal_start_date: new Date(),
        goal_end_date: new Date(),
        goal_period: 0,
        meal_plan: 'normal',
        daily_carb: 0,
        daily_fat: 0,
        daily_protein: 0,
    });

    const { createGoal } = useCreateGoal(registerData);

    const submitGoalData = (data: MealPlanInfoType) => {
        setRegisterData((prev) => ({ ...prev, ...data }));

        try {
            createGoal();
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
                        removeLocalStorageItem('dailyCalories');
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
                <GoalMealPlanStep onNext={(data) => submitGoalData(data)} />
            </Funnel.Step>
        </Funnel>
    );
};

export default GoalStep;

// 'use client';

// import { useFunnel } from '@/hooks';
// import { useState } from 'react';
// import { GoalRegisterType, SuggestionGoalType } from '@/service/@types/req.type';
// import { useCreateGoal } from '@/hooks/mutations/useCreateGoal';
// import { useRouter } from 'next/navigation';
// import { removeLocalStorageItem } from '@/shared/utils';
// import GoalIntro from './GoalIntro';
// import GoalBasicInfoStep from './GoalBasicInfoStep';
// import GoalWeightInfoStep from './GoalWeightInfoStep';
// import GoalCaloriesStep from './GoalCaloriesStep';

// const GoalStep = () => {
//     const router = useRouter();
//     const [Funnel, setStep] = useFunnel(['goalIntro', 'basicInfo', 'weightInfo', 'goalInfo'] as const, {
//         initialStep: 'goalIntro',
//         stepQueryKey: 'goal-step',
//         // onStepChange: (step) => console.log(`Current step: ${step}`),
//     });

//     const [registerData, setRegisterData] = useState<GoalRegisterType>({
//         gender: 'F',
//         age: 0,
//         height: 0,
//         activity_level: 'moderate',
//         weight: 0,
//         target_weight: 0,
//         daily_calories: 0,
//         goal_start_date: new Date(),
//         goal_end_date: new Date(),
//         goal_period: 0,
//     });

//     const { createGoal } = useCreateGoal(registerData);

//     const submitGoalData = (data: SuggestionGoalType) => {
//         setRegisterData((prev) => ({ ...prev, ...data }));

//         try {
//             createGoal();
//             router.push('/home');
//         } catch (err) {
//             throw err;
//         }
//     };

//     return (
//         <Funnel>
//             <Funnel.Step name="goalIntro">
//                 <GoalIntro
//                     onNext={() => {
//                         removeLocalStorageItem('goalData');
//                         removeLocalStorageItem('dailyCalories');
//                         setStep('basicInfo');
//                     }}
//                 />
//             </Funnel.Step>

//             <Funnel.Step name="basicInfo">
//                 <GoalBasicInfoStep
//                     onNext={(data) => {
//                         setRegisterData((prev) => ({ ...prev, ...data }));
//                         setStep('weightInfo');
//                     }}
//                 />
//             </Funnel.Step>

//             <Funnel.Step name="weightInfo">
//                 <GoalWeightInfoStep
//                     onNext={(data) => {
//                         setRegisterData((prev) => ({ ...prev, ...data }));
//                         setStep('goalInfo');
//                     }}
//                 />
//             </Funnel.Step>

//             <Funnel.Step name="goalInfo">
//                 <GoalCaloriesStep registerData={registerData} onNext={(data) => submitGoalData(data)} />
//             </Funnel.Step>
//         </Funnel>
//     );
// };

// export default GoalStep;
