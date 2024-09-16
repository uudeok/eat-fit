import { MealType } from '@/constants/meals';

type NutrientsType = {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
};

export const calculateNutrientTotals = (mealData: MealType[]): NutrientsType => {
    return mealData.reduce(
        (totals, item) => {
            totals.calories += item.calories;
            totals.carbohydrate += item.carbohydrate;
            totals.protein += item.protein;
            totals.fat += item.fat;
            return totals;
        },
        { calories: 0, carbohydrate: 0, protein: 0, fat: 0 }
    );
};
