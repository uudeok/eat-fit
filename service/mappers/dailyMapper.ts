import { EmojiKey } from '@/constants';
import { CreateDailySpecArgs, DailySpecType, UpdateDailySpecArgs } from '../@types';
import { Nullable } from '@/@types';

export type DecodeDailySpec = {
    id: number;
    goalId: number;
    userId: string;
    entryDate: string;
    todayWeight: number;
    mood: Nullable<EmojiKey>;
    diary: string;
};

export const decodeDailySpec = (init: DailySpecType): DecodeDailySpec => ({
    id: init.id,
    goalId: init.goal_id,
    userId: init.user_id,
    entryDate: init.entry_date,
    todayWeight: init.today_weight ?? 0,
    mood: init.mood,
    diary: init.diary,
});

type CreateDailySpecType = {
    goalId: number;
    entryDate: string;
    todayWeight: number;
    mood: Nullable<EmojiKey>;
};

export const encodeCreateDailySpec = (init: CreateDailySpecType): CreateDailySpecArgs => ({
    goal_id: init.goalId,
    entry_date: init.entryDate,
    today_weight: init.todayWeight,
    mood: init.mood,
});

type UpdateDailySpecType = {
    id: number;
    todayWeight: number;
    mood: Nullable<EmojiKey>;
    diary: string;
};

export const encodeUpdateDailySpec = (init: UpdateDailySpecType): UpdateDailySpecArgs => ({
    id: init.id,
    today_weight: init.todayWeight ?? 0,
    mood: init.mood,
    diary: init.diary,
});
