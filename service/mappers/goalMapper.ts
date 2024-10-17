import {
    ActivityLevelType,
    CreateGoalArgs,
    GenderType,
    GoalRegisterType,
    GoalStatusType,
    GoalType,
    MealPlanType,
} from '../@types';

export type DecodeGoalType = {
    id: number;
    userId: string;
    goalStatus: GoalStatusType;
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

export const decodeGoal = (init: GoalType): DecodeGoalType => ({
    id: init.id,
    userId: init.user_id,
    goalStatus: init.goal_status,
    gender: init.gender,
    age: init.age || 0,
    height: init.height || 0,
    weight: init.weight || 0,
    activityLevel: init.activity_level,
    targetWeight: init.target_weight,
    dailyCalories: init.daily_calories || 0,
    goalPeriod: init.goal_period,
    startDate: init.goal_start_date,
    endDate: init.goal_end_date,
    mealPlan: init.meal_plan,
    dailyCarb: init.daily_carb || 0,
    dailyProtein: init.daily_protein || 0,
    dailyFat: init.daily_fat || 0,
});

export const encodeCreateGoal = (init: GoalRegisterType): CreateGoalArgs => ({
    gender: init.gender,
    age: init.age,
    height: init.height,
    weight: init.weight,
    activity_level: init.activityLevel,
    target_weight: init.targetWeight,
    daily_calories: init.dailyCalories,
    daily_carb: init.dailyCarb,
    daily_protein: init.dailyProtein,
    daily_fat: init.dailyFat,
    goal_period: init.goalPeriod,
    goal_start_date: init.startDate,
    goal_end_date: init.endDate,
    meal_plan: init.mealPlan,
});
