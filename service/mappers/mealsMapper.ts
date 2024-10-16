import { MealsKeysType } from '@/constants';
import { CreateMealsArgs, MealItemType, MealsType, UpdateMealsArgs } from '../@types';
import { convertToKST, convertToServingTime } from '@/shared/utils';
import { ServingTimeType } from '@/components/modal/MealTimeSheet';

const DEFAULT_CALORIES = 0;
const DEFAULT_PROTEIN = 0;
const DEFAULT_FAT = 0;
const DEFAULT_CARBOHYDRATE = 0;

export type DecodeMealItemType = {
    id: number;
    content: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrate: number;
    foodName: string;
    servingSize?: number;
};

export type DecodeMealsType = {
    id: number;
    dailyId: number;
    userId: string;
    entryDate: string;
    mealType: MealsKeysType;
    photoUrls: string[];
    servingTime: ServingTimeType | null;
    mealItem: DecodeMealItemType[];
};

export type DecodeMealsListType = {
    mealsList: DecodeMealsType[];
    isEmpty: boolean;
    flatMealItem: DecodeMealItemType[];
};

export const decodeMealItem = (init: MealItemType): DecodeMealItemType => ({
    id: init.id,
    content: init.content,
    calories: init.calories || DEFAULT_CALORIES,
    protein: init.protein || DEFAULT_PROTEIN,
    fat: init.fat || DEFAULT_FAT,
    carbohydrate: init.carbohydrate || DEFAULT_CARBOHYDRATE,
    foodName: init.food_name,
    servingSize: init.serving_size,
});

export const decodeMeals = (init: MealsType): DecodeMealsType => ({
    id: init.id,
    dailyId: init.daily_id,
    userId: init.user_id,
    entryDate: init.entry_date,
    mealType: init.meal_type,
    photoUrls: init.photo_url,
    servingTime: convertToKST(init.serving_time),
    mealItem: init.meal.map((m) => decodeMealItem(m)),
});

export const decodeMealsList = (init: MealsType[]): DecodeMealsListType => ({
    mealsList: init.map(decodeMeals),
    isEmpty: init.length === 0,
    flatMealItem: init.flatMap((meals) => meals.meal.map(decodeMealItem)),
});

/******************* encode 작성 *******************/

export const encodeMealItem = (init: DecodeMealItemType): MealItemType => ({
    id: init.id,
    content: init.content,
    calories: init.calories,
    carbohydrate: init.carbohydrate,
    protein: init.protein,
    fat: init.fat,
    food_name: init.foodName,
    serving_size: init.servingSize,
});

export type CreateMealsType = {
    dailyId: number;
    entryDate: string;
    mealType: MealsKeysType;
    mealItem: DecodeMealItemType[];
};

export const encodeCreateMeal = (init: CreateMealsType): CreateMealsArgs => ({
    daily_id: init.dailyId,
    entry_date: init.entryDate,
    meal_type: init.mealType,
    meal: init.mealItem.map(encodeMealItem),
});

export const encodeUpdateMeal = (init: DecodeMealsType): UpdateMealsArgs => ({
    id: init.id,
    meal_type: init.mealType,
    serving_time: init.servingTime ? convertToServingTime(init.servingTime) : null,
    photo_url: init.photoUrls,
    meal: init.mealItem.map(encodeMealItem),
});
