import { EmojiKey } from '@/constants';
import { MealsKeysType } from '@/constants/meals';
import { ExerciseType } from './res.type';
import { Nullable } from '@/@types';

export type GenderType = 'F' | 'M';
export type GoalStatusType = 'progress' | 'success' | 'failure';
export type ActivityLevelType = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
export type MealPlanType = 'normal' | 'lowCarbHighFat' | 'proteinFocused';

export type GoalRegisterType = {
    gender: GenderType;
    age: number;
    height: number;
    weight: number;
    activityLevel: ActivityLevelType;
    targetWeight: number;
    dailyCalories: number;
    goalPeriod: number;
    startDate: string;
    endDate: string;
    mealPlan: MealPlanType;
    dailyCarb: number;
    dailyProtein: number;
    dailyFat: number;
};

export type CreateGoalArgs = {
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
    activityLevel: ActivityLevelType;
};

export type WeightInfoType = {
    weight: number;
    targetWeight: number;
};

export type GoalCaloriesInfoType = {
    dailyCalories: number;
    startDate: string;
    endDate: string;
    goalPeriod: number;
};

export type MealPlanInfoType = {
    mealPlan: MealPlanType;
    dailyCarb: number;
    dailyProtein: number;
    dailyFat: number;
};

export type CreateDailySpecArgs = {
    goal_id: number;
    entry_date: string;
    today_weight: number | null;
    mood: EmojiKey | null;
};

export type UpdateDailySpecArgs = {
    id: number;
    today_weight: Nullable<number>;
    mood: Nullable<EmojiKey>;
};

export type MealItemType = {
    id: number;
    food_name: string;
    serving_size?: number;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    content: string;
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
    serving_time: Nullable<Date>;
    photo_url?: Nullable<string[]>;
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
