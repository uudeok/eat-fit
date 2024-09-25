export type GenderType = 'F' | 'M';
export type GoalStatusType = 'progress' | 'success' | 'failure';
export type ActivityLevelType = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
export type MealPlanType = 'normal' | 'lowCarbHighFat' | 'proteinFocused';

export type GoalsType = {
    id: number;
    user_id: string;
    goal_status: GoalStatusType;
    gender: GenderType;
    age: number;
    height: number;
    weight: number;
    activity_level: ActivityLevelType;
    terget_weight: number;
    daily_calories: number;
    goal_period: number;
    goal_start_date: Date;
    goal_end_date: Date;
    created_at: Date;
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
    goal_start_date: Date;
    goal_end_date: Date;
    goal_period: number;
};

export type MealPlanInfoType = {
    meal_plan: MealPlanType;
    daily_carb: number;
    daily_protein: number;
    daily_fat: number;
};

export type GoalRegisterType = BasicInfoType & WeightInfoType & GoalCaloriesInfoType & MealPlanInfoType;
