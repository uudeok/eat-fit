import { ACTIVITY_LEVEL } from '@/constants';
import { GenderType, BasicInfoType, GoalRegisterType, MealPlanType } from '@/service/@types';

/* 기초대사량 (BMR) 계산식 */
export function calculateBMR({
    gender,
    weight,
    height,
    age,
}: {
    gender: GenderType;
    weight: number;
    height: number;
    age: number;
}): number {
    if (gender === 'M') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}

/* 활동에너지 (TDEE) 계산식 */
export function calculateTDEE({
    gender,
    weight,
    height,
    age,
    activityLevel,
}: BasicInfoType & { weight: number }): number {
    const bmr = calculateBMR({ gender, weight, height, age });

    return bmr * ACTIVITY_LEVEL[activityLevel];
}

/* 체중 변화에 따른 목표 칼로리 계산 함수 */
export function calculateCaloriesToGoal({
    weight,
    targetWeight,
    gender,
    height,
    age,
    activityLevel,
}: GoalRegisterType): { dailyCalories: number; daysToGoal: number } {
    const oneWeeks = 7;
    const weightDifference = targetWeight - weight;
    const tdee = calculateTDEE({
        gender: gender,
        weight: weight,
        height: height,
        age: age,
        activityLevel: activityLevel,
    });

    if (weightDifference === 0) return { dailyCalories: Math.ceil(tdee), daysToGoal: 60 };

    const dailyCalorieAdjustment = weightDifference > 0 ? 500 : -500;

    let dailyCalories = Math.ceil(tdee + dailyCalorieAdjustment);

    let daysToGoal = Math.ceil((Math.abs(weightDifference) / 0.5) * oneWeeks);

    return { dailyCalories, daysToGoal };
}

export function recalculateCaloriesToGoal(currentCalories: number, currentDaysToGoal: number, newCalories: number) {
    return Math.ceil((newCalories * currentDaysToGoal) / currentCalories);
}

export function calculateWeightRange(height: number): { minWeight: number; maxWeight: number } {
    const heightInMeters = height / 100; // 키를 미터로 변환
    const minBmi = 16;
    const maxBmi = 30;

    const minWeight = minBmi * heightInMeters ** 2;
    const maxWeight = maxBmi * heightInMeters ** 2;

    return {
        minWeight: Math.round(minWeight * 10) / 10,
        maxWeight: Math.round(maxWeight * 10) / 10,
    };
}

export function calculateNutrientRatio(dailyCalories: number, mealPlan: MealPlanType) {
    let ratios;

    // 식단 타입에 따른 비율 설정
    switch (mealPlan) {
        case 'normal':
            ratios = { carbs: 0.57, protein: 0.18, fat: 0.25 };
            break;
        case 'proteinFocused':
            ratios = { carbs: 0.6, protein: 0.2, fat: 0.2 };
            break;
        case 'lowCarbHighFat':
            ratios = { carbs: 0.08, protein: 0.22, fat: 0.7 };
            break;
        default:
            throw new Error('유효하지 않은 식단 입니다.');
    }

    // 각 영양소의 칼로리 계산
    const carbsCalories = dailyCalories * ratios.carbs;
    const proteinCalories = dailyCalories * ratios.protein;
    const fatCalories = dailyCalories * ratios.fat;

    // 각 영양소의 그램 수 계산 (1g 탄수화물 = 4 kcal, 1g 단백질 = 4 kcal, 1g 지방 = 9 kcal)
    const carbsGrams = carbsCalories / 4;
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;

    return {
        daily_carb: Math.round(carbsGrams),
        daily_protein: Math.round(proteinGrams),
        daily_fat: Math.round(fatGrams),
    };
}
