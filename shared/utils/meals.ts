import { DecodeMealItemType } from '@/service/mappers/mealsMapper';

export type NutrientsType = {
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
};

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
