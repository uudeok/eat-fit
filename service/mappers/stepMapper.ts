import { EmojiKey, MealsKeysType } from '@/constants';
import { DailyStepType, ExercisePickType, MealPickType } from '../@types';
import { decodeMealItem, DecodeMealItemType } from './mealsMapper';
import { decodeExerciseItem, DecodeExercisesItemType } from './exercisesMapper';
import { ServingTimeType } from '@/components/modal/MealTimeSheet';
import {
    BurnedCaloriesType,
    calculateExercisesTotals,
    calculateTotalNutrients,
    convertToKST,
    NutrientsType,
} from '@/shared/utils';

export type DecodeDailyStepType = {
    id: number;
    userId: string;
    entryDate: string;
    goalId: number;
    mood: EmojiKey;
    todayWeight: number;
    meals: DecodePickMealType[];
    exercises: DecodePickExercisesType[];
};

export type DecodePickMealType = {
    id: number;
    mealType: MealsKeysType;
    servingTime: ServingTimeType | null;
    mealItem: DecodeMealItemType[];
    photoUrls: string[];
};

export type DecodePickExercisesType = {
    id: number;
    photoUrls: string[];
    exercise: DecodeExercisesItemType[];
};

export const decodeDailyMeals = (init: MealPickType): DecodePickMealType => ({
    id: init.id,
    mealType: init.meal_type,
    servingTime: convertToKST(init.serving_time),
    mealItem: init.meal.map(decodeMealItem),
    photoUrls: init.photo_url,
});

export const decodeDailyExercises = (init: ExercisePickType): DecodePickExercisesType => ({
    id: init.id,
    photoUrls: init.photo_url,
    exercise: init.exercise.map(decodeExerciseItem),
});

export const decodeDailyStep = (init: DailyStepType): DecodeDailyStepType => ({
    id: init.id,
    userId: init.user_id,
    entryDate: init.entry_date,
    goalId: init.goal_id,
    mood: init.mood,
    todayWeight: init.today_weight,
    meals: init.meals.map(decodeDailyMeals),
    exercises: init.exercises.map(decodeDailyExercises),
});

export type DecodeDailyStepListType = {
    dailyStep: DecodeDailyStepType;
    mealsList: DecodePickMealType[];
    exercisesList: DecodePickExercisesType[];
    mealItemList: DecodeMealItemType[];
    exerciseItemList: DecodeExercisesItemType[];
    nutrientTotals: NutrientsType;
    burnedCaloriesTotals: BurnedCaloriesType;
};

export const decodeDailyStepList = (init: DailyStepType): DecodeDailyStepListType => {
    const decodedStep = decodeDailyStep(init);

    return {
        dailyStep: decodedStep,
        mealsList: decodedStep.meals,
        exercisesList: decodedStep.exercises,
        mealItemList: decodedStep.meals.flatMap((meal) => meal.mealItem),
        exerciseItemList: decodedStep.exercises.flatMap((exercise) => exercise.exercise),
        nutrientTotals: calculateTotalNutrients(decodedStep.meals.flatMap((data) => data.mealItem)),
        burnedCaloriesTotals: calculateExercisesTotals(decodedStep.exercises.flatMap((data) => data.exercise)),
    };
};

export type DecodeDailyStepInRangeType = {
    steps: DecodeDailyStepListType[];
};

export const decodeDailyStepInRange = (init: DailyStepType[]): DecodeDailyStepInRangeType => ({
    steps: init.map(decodeDailyStepList),
});
