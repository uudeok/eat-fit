import { MealsType } from '@/constants/meals';

export const calculateNutrientTotals = (mealData: MealsType[]) => {
    return mealData[0]?.meal.reduce(
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
