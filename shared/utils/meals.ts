import { MealItemType } from '@/service/@types';

type NutrientsType = {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
};

export const calculateNutrientTotals = (mealData: MealItemType[]): NutrientsType => {
    return mealData.reduce(
        (totals, item) => {
            totals.calories += Number(item.calories);
            totals.carbohydrate += Number(item.carbohydrate);
            totals.protein += Number(item.protein);
            totals.fat += Number(item.fat);
            return totals;
        },
        { calories: 0, carbohydrate: 0, protein: 0, fat: 0 }
    );
};

export const calculateTotalNutrients = (meals: MealItemType[]): NutrientsType => {
    if (meals.length === 0) {
        return { calories: 0, carbohydrate: 0, protein: 0, fat: 0 };
    }

    return meals.reduce(
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
};
