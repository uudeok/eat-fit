import { EmojiKey, ExerciseIntensityKeysType } from '@/constants';
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

/* meals 테이블 가져올때  */
export type MealsType = {
    id: number;
    daily_id: number;
    created_at: string;
    user_id: string;
    entry_date: string;
    meal_type: MealsKeysType;
    serving_time: Date | null;
    meal: MealItemType[];
    photo_url: string[] | null;
};

/* daily & meals 테이블 join  */
export type DailyStepType = {
    created_at: string;
    entry_date: string;
    goal_id: number;
    id: number;
    meals: MealType[];
    mood: EmojiKey | null;
    today_weight: number | null;
    user_id: string;
};

/* daily & meals 테이블 join 할때 meals 테이블에서 가져오는 데이터의 타입 */
export type MealType = Pick<MealsType, 'id' | 'meal_type' | 'photo_url' | 'serving_time' | 'meal'>;

/* exercises 테이블 가져올때 */
export type ExercisesType = {
    id: number;
    daily_id: number;
    created_at: string;
    user_id: string;
    entry_date: string;
    exercise: ExerciseType[];
    photo_url: string[] | null;
};

export type ExerciseType = {
    id: number;
    exercise_name: string;
    duration_min: number;
    calories_burned: number;
    exercise_intensity: ExerciseIntensityKeysType | null;
    content: string | null;
};

export type UserRoleType = 'general' | 'manager' | 'admin';
export type UserExposeType = 'pubilc' | 'privacy' | 'follower';

export type UserType = {
    id: string;
    username: string;
    nickname: string;
    avatar_url: string | null;
    email: string;
    created_at: string;
    role: UserRoleType;
    expose: UserExposeType;
    content: string | null;
};
