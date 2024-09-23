import { EmojiKey } from './emotion';
import { GoalsType } from '@/service/@types/req.type';

export const ACTIVITY_LEVEL = {
    very_low: 1.2,
    low: 1.375,
    moderate: 1.55,
    high: 1.725,
    very_high: 1.9,
};

type DailyType = {
    id: number;
    goal_id: number;
    user_id: string;
    entry_date: string;
    today_weight: number | null;
    mood: EmojiKey | null;
};

const Goal: GoalsType = {
    id: 100,
    user_id: 'abc',
    goal_status: 'progress',
    gender: 'F',
    age: 29,
    height: 170,
    weight: 60,
    activity_level: 'moderate',
    terget_weight: 55,
    daily_calories: 2500,
    goal_period: 30,
    goal_start_date: '2024-09-04',
    goal_end_date: '2024-10-03',
    updated_at: 'updated_at',
    created_at: 'created_at',
};

const Daily: DailyType = {
    id: 1,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-05',
    today_weight: 60.05, // default null
    mood: 'good', // default null
};

const Daily2: DailyType = {
    id: 2,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-06',
    today_weight: 60,
    mood: 'hungry',
};

const Daily3: DailyType = {
    id: 3,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-07',
    today_weight: null,
    mood: null,
};
