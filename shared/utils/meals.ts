import { DecodeMealItemType } from '@/service/mappers/mealsMapper';
import { generateWeeklyDates, getPastWeekDates } from './date';
import { DecodeDailyStepInRangeType } from '@/service/mappers/stepMapper';

export type NutrientsType = {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
};

const oneWeeks = 7;

export const calculateTotalNutrients = (meals: DecodeMealItemType[]): NutrientsType => {
    if (meals.length === 0) {
        return { calories: 0, carbohydrate: 0, protein: 0, fat: 0 };
    }

    const totals = meals.reduce(
        (totals, meal) => {
            return {
                calories: totals.calories + Number(meal.calories),
                carbohydrate: totals.carbohydrate + Number(meal.carbohydrate),
                protein: totals.protein + Number(meal.protein),
                fat: totals.fat + Number(meal.fat),
            };
        },
        { calories: 0, carbohydrate: 0, protein: 0, fat: 0 }
    );

    return {
        calories: Math.round(totals.calories * 10) / 10,
        carbohydrate: Math.round(totals.carbohydrate * 10) / 10,
        protein: Math.round(totals.protein * 10) / 10,
        fat: Math.round(totals.fat * 10) / 10,
    };
};

export type CaloiresType = {
    date?: string;
    calories: number;
    burnedCalories: number;
};

export type AverageCaloiresType = {
    averageCalories: number;
    averageBurnedCalories: number;
};

export const calculateCalories = (dailySteps: DecodeDailyStepInRangeType, dateRange: string[]) => {
    // dateRange는 ['YYYY-MM-DD', 'YYYY-MM-DD', ...] 형식의 날짜 배열
    const caloriesArray = dateRange.map((date) => {
        const matchingStep = dailySteps?.steps.find((step) => step.dailyStep.entryDate === date);

        return {
            date: date,
            calories: matchingStep ? matchingStep.nutrientTotals.calories : 0,
            burnedCalories: matchingStep ? matchingStep.burnedCaloriesTotals.caloriesBurned : 0,
        };
    });

    return caloriesArray;
};

export const calculateAverageCalories = (weeklyStep: DecodeDailyStepInRangeType): AverageCaloiresType[] => {
    const weeklyDates = generateWeeklyDates(oneWeeks);

    const weeklyCalories = weeklyDates.map((week) => {
        const weeklyData = week.map((date) => {
            const matchedStep = weeklyStep?.steps.find((step) => step.dailyStep.entryDate === date);

            return {
                calories: matchedStep ? matchedStep.nutrientTotals.calories : 0,
                burnedCalories: matchedStep ? matchedStep.burnedCaloriesTotals.caloriesBurned : 0,
            };
        });

        const totalCalories = weeklyData.reduce((sum, day) => sum + (day.calories || 0), 0);
        const totalBurnedCalories = weeklyData.reduce((sum, day) => sum + (day.burnedCalories || 0), 0);

        const averageCalories = totalCalories / 7 || 0;
        const averageBurnedCalories = totalBurnedCalories / 7 || 0;

        return {
            averageCalories: Math.round(averageCalories),
            averageBurnedCalories: Math.round(averageBurnedCalories),
        };
    });

    return weeklyCalories;
};
