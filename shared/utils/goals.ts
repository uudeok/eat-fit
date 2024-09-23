import { ACTIVITY_LEVEL } from '@/constants/daily';
import { roundNumber } from './validation';
import { GenderType, BasicInfoType, GoalRegisterType, ActivityLevelType } from '@/service/@types';

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

/* 활동량 (TDEE) 계수 계산식 */
export function calculateTDEE({
    gender,
    weight,
    height,
    age,
    activity_level,
}: BasicInfoType & { weight: number }): number {
    const bmr = calculateBMR({ gender, weight, height, age });

    return bmr * ACTIVITY_LEVEL[activity_level];
}

/* 체중 변화에 따른 목표 칼로리 계산 함수 */
export function calculateCaloriesToGoal({
    weight,
    target_weight,
    gender,
    height,
    age,
    activity_level,
}: GoalRegisterType): { dailyCalories: number; daysToGoal: number } {
    const oneWeeks = 7;
    const weightDifference = target_weight - weight;
    const tdee = calculateTDEE({
        gender: gender,
        weight: weight,
        height: height,
        age: age,
        activity_level: activity_level,
    });

    if (weightDifference === 0) return { dailyCalories: tdee, daysToGoal: 60 };

    const dailyCalorieAdjustment = weightDifference > 0 ? 500 : -500;

    let dailyCalories = Math.ceil(tdee + dailyCalorieAdjustment);

    let daysToGoal = (Math.abs(weightDifference) / 0.5) * oneWeeks;

    return { dailyCalories, daysToGoal };
}

export function recalculateCaloriesToGoal(currentCalories: number, currentDaysToGoal: number, newCalories: number) {
    return Math.ceil((newCalories * currentDaysToGoal) / currentCalories);
}
