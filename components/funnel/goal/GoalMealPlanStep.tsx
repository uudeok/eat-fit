'use client';

import styles from '@styles/component/goalMealPlan.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import { ListRow, Text } from '../../common';
import { Button } from '../../common/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MealPlanInfoType, MealPlanType } from '@/service/@types';
import { calculateNutrientRatio } from '@/shared/utils';
import { useGoalStore } from './GoalStep';

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

const MEAL_PLAN_OPTIONS: MealPlan[] = [
    { key: 'normal', label: '일반', icon: 'carbohydrate.png', content: '탄단지 균형잡힌 식단', selected: false },
    {
        key: 'proteinFocused',
        label: '근육',
        icon: 'protein.png',
        content: '근육 생성을 위한 단백질 위주 식단',
        selected: false,
    },
    {
        key: 'lowCarbHighFat',
        label: '저탄고지',
        icon: 'fat.png',
        content: '탄수화물 제한, 저탄고지 위주 식단',
        selected: false,
    },
];

const GoalMealPlanStep = ({ onNext }: Props) => {
    const { data } = useGoalStore();

    console.log('mealPlan-Step : ', data);

    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<MealPlanType>();

    // const session = useCache('session');
    // const initialData: GoalRegisterType | null = session.getItem(SESSION_KEYS.GOAL);

    const handleCheckboxChange = (key: MealPlanType) => {
        setSelectedPlan(key);
    };

    const submitMealPlan = () => {
        if (selectedPlan && data) {
            /* 식단 정보 기반 권장 탄, 단, 지 비율 계산식 */
            const nutrientRatio = calculateNutrientRatio(data.dailyCalories, selectedPlan);
            const dailyPlanData = {
                mealPlan: selectedPlan,
                dailyCarb: nutrientRatio.daily_carb,
                dailyProtein: nutrientRatio.daily_protein,
                dailyFat: nutrientRatio.daily_fat,
            };

            // session.setItem(SESSION_KEYS.GOAL, { ...initialData, ...dailyPlanData });
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
