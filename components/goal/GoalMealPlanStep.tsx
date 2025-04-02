'use client';

import styles from '@styles/component/goalMealPlan.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MealPlanInfoType, MealPlanType } from '@/service/@types';
import { calculateNutrientRatio } from '@/shared/utils';
import { MEAL_PLAN_OPTIONS } from '@/constants';
import { useGoalSotre } from '@/shared/store/useGoalStore';
import { ListRow, Text } from '../common';
import { Button } from '../common/Button';

type Props = {
    onNext: (data: MealPlanInfoType) => void;
};

export type MealPlanOptionsType = {
    key: MealPlanType;
    label: string;
    icon: string;
    content: string;
    selected: boolean;
};

const GoalMealPlanStep = ({ onNext }: Props) => {
    const { data: registerData } = useGoalSotre();

    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<MealPlanType>();

    const handleCheckboxChange = (key: MealPlanType) => {
        setSelectedPlan(key);
    };

    const submitMealPlan = () => {
        if (selectedPlan && registerData) {
            /* 식단 정보 기반 권장 탄, 단, 지 비율 계산식 */
            const nutrientRatio = calculateNutrientRatio(registerData.dailyCalories, selectedPlan);
            const dailyPlanData = {
                mealPlan: selectedPlan,
                dailyCarb: nutrientRatio.daily_carb,
                dailyProtein: nutrientRatio.daily_protein,
                dailyFat: nutrientRatio.daily_fat,
            };

            onNext(dailyPlanData);
        }
    };

    return (
        <div className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />

            <div className={styles.header}>
                <Text bold size="xxlg">
                    식단 계획을 알려주세요 !
                </Text>
                <Text bold size="lg" color="var(--grey700)">
                    탄단지 비율을 조정해드려요
                </Text>
            </div>

            {MEAL_PLAN_OPTIONS.map((plan) => (
                <ListRow
                    key={plan.key}
                    left={
                        <div className={styles.plan}>
                            <Image src={`/images/${plan.icon}`} alt={plan.label} width={45} height={45} />
                            <div className={styles.planInfo}>
                                <Text bold size="lg">
                                    {plan.label}
                                </Text>
                                <Text color="var(--grey700)">{plan.content}</Text>
                            </div>
                        </div>
                    }
                    right={
                        <>
                            <input
                                type="checkbox"
                                id={`check-${plan.key}`}
                                checked={plan.selected}
                                onChange={() => handleCheckboxChange(plan.key)}
                                className={styles.checkbox}
                            />
                            <label
                                htmlFor={`check-${plan.key}`}
                                className={`${styles.customCheckbox} ${selectedPlan === plan.key && styles.checked}`}
                            ></label>
                        </>
                    }
                />
            ))}

            <div className={styles.nextBtn}>
                <Button size="lg" role="confirm" onClick={submitMealPlan}>
                    시작하기
                </Button>
            </div>
        </div>
    );
};

export default GoalMealPlanStep;
