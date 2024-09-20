export type GoalStatusType = 'progress' | 'success' | 'failure';

export type GoalsType = {
    id: number;
    user_id: string;
    goal_status: GoalStatusType;
    gender: 'F' | 'M';
    age: number;
    height: number;
    weight: number;
    activity_level: number;
    terget_weight: number;
    goal: 'loss' | 'maintain' | 'gain';
    daily_calories: number;
    goal_period: number;
    goal_start_date: string;
    goal_end_date: string;
    updated_at: string;
    created_at: string;
};
