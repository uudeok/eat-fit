'use client';

import styles from '@styles/component/goalMealPlan.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import { ListRow, Text } from '../common';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoalRegisterType, MealPlanInfoType, MealPlanType } from '@/service/@types';
import { calculateNutrientRatio } from '@/shared/utils';

type Props = {
    onNext: (data: MealPlanInfoType) => void;
};

type MealPlan = {
    key: MealPlanType;
    label: string;
    icon: string;
    content: string;
    selected: boolean;
};

const MEAL_PLAN: MealPlan[] = [
    { key: 'normal', label: '일반', icon: '/carbohydrate.png', content: '탄단지 균형잡힌 식단', selected: false },
    {
        key: 'proteinFocused',
        label: '근육',
        icon: '/protein.png',
        content: '근육 생성을 위한 단백질 위주 식단',
        selected: false,
    },
    {
        key: 'lowCarbHighFat',
        label: '저탄고지',
        icon: '/fat.png',
        content: '탄수화물 제한, 저탄고지 위주 식단',
        selected: false,
    },
];

const GoalMealPlanStep = ({ onNext }: Props) => {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<MealPlanType>();
    const storage = localStorage.getItem('goalData');
    const storedData: GoalRegisterType = storage ? JSON.parse(storage) : null;

    const handleCheckboxChange = (key: MealPlanType) => {
        setSelectedPlan(key);
    };

    const handleMealPlan = () => {
        if (selectedPlan) {
            const nutrientRatio = calculateNutrientRatio(storedData.daily_calories, selectedPlan);

            onNext({
                meal_plan: selectedPlan,
                daily_carb: nutrientRatio.daily_carb,
                daily_protein: nutrientRatio.daily_protein,
                daily_fat: nutrientRatio.daily_fat,
            });
        }
    };

    return (
        <div className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />

            <div className={styles.header}>
                <Text bold size="xxlg">
                    마지막으로 식단 계획을 알려주세요 !
                </Text>
                <Text bold size="lg" color="var(--grey700)">
                    탄단지 비율을 조정해드려요
                </Text>
            </div>
            {MEAL_PLAN.map((plan) => (
                <ListRow
                    key={plan.key}
                    left={
                        <div className={styles.plan}>
                            <Image src={plan.icon} alt={plan.label} width={45} height={45} />
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
                <Button size="lg" role="confirm" onClick={handleMealPlan}>
                    시작하기
                </Button>
            </div>
        </div>
    );
};

export default GoalMealPlanStep;
