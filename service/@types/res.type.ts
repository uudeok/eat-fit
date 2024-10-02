import { EmojiKey } from '@/constants';
import { ActivityLevelType, GenderType, GoalStatusType, MealItemType, MealPlanType } from './req.type';
import { MealsKeysType } from '@/constants/meals';

export type GoalType = {
    id: number;
    user_id: string;
    goal_status: GoalStatusType;
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
    created_at: string;
    meal_plan: MealPlanType;
    daily_carb: number;
    daily_protein: number;
    daily_fat: number;
};

export type DailySpecType = {
    id: number;
    goal_id: number;
    user_id: string;
    entry_date: string;
    today_weight: number | null;
    mood: EmojiKey | null;
    created_at: string;
};

export type MealType = {
    id: number;
    daily_id: number;
    created_at: string;
    user_id: string;
    entry_date: string;
    meal_type: MealsKeysType;
    serving_time: string | null;
    meal: MealItemType[];
    photo_url: string[] | null;
};

export type DailyStepType = {
    created_at: string;
    entry_date: string;
    goal_id: number;
    id: number;
    meals: MealsType[];
    mood: EmojiKey | null;
    today_weight: number | null;
    user_id: string;
};

export type MealsType = {
    id: number;
    meal_type: MealsKeysType;
    photo_url: string[] | null;
    serving_time: string | null;
    meal: MealItemType[] | null;
};
