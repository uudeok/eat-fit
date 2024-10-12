import { EmojiKey } from '@/constants';
import { MealsKeysType } from '@/constants/meals';
import { ExerciseType } from './res.type';

export type GenderType = 'F' | 'M';
export type GoalStatusType = 'progress' | 'success' | 'failure';
export type ActivityLevelType = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
export type MealPlanType = 'normal' | 'lowCarbHighFat' | 'proteinFocused';

export type GoalRegisterType = {
    gender: GenderType;
    age: number;
    height: number;
    weight: number;
    activity_level: ActivityLevelType;
    target_weight: number;
    daily_calories: number;
    goal_period: number;
    goal_start_date: string;
    goal_end_date: string;
    meal_plan: MealPlanType;
    daily_carb: number;
    daily_protein: number;
    daily_fat: number;
};

export type BasicInfoType = {
    gender: GenderType;
    age: number;
    height: number;
    activity_level: ActivityLevelType;
};

export type WeightInfoType = {
    weight: number;
    target_weight: number;
};

export type GoalCaloriesInfoType = {
    daily_calories: number;
    goal_start_date: string;
    goal_end_date: string;
    goal_period: number;
};

export type MealPlanInfoType = {
    meal_plan: MealPlanType;
    daily_carb: number;
    daily_protein: number;
    daily_fat: number;
};

export type CreateDailySpecArgs = {
    goal_id: number;
    entry_date: string;
    today_weight: number | null;
    mood: EmojiKey | null;
};

export type UpdateDailySpecArgs = {
    id: number;
    today_weight: number | null;
    mood: EmojiKey | null;
};

export type MealItemType = {
    id: number;
    food_name: string;
    serving_size?: number | null;
    calories: number | null;
    carbohydrate: number | null;
    protein: number | null;
    fat: number | null;
    content: string | null;
};

export type CreateMealsArgs = {
    daily_id: number;
    entry_date: string;
    meal_type: MealsKeysType;
    meal: MealItemType[];
};

/* meals 데이터 중 일부만 수정할 수 있기에 optional 로 지정 */
export type UpdateMealsArgs = {
    meal_type: MealsKeysType;
    serving_time: Date | null;
    photo_url?: string[] | null;
    meal: MealItemType[];
    id: number;
};

export type CreateExercisesArgs = {
    daily_id: number;
    entry_date: string;
    exercise: ExerciseType[];
};

export type UpdateExercisesArgs = {
    id: number;
    exercise: ExerciseType[];
    photo_url?: string[] | null;
};

export type UpdateUserArgs = {
    id: string;
    avatar_url: string | null;
    nickname: string;
    content: string | null;
};
