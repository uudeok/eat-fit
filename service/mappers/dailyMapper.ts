import { EmojiKey } from '@/constants';
import { DailySpecType } from '../@types';
import { Nullable } from '@/@types';

export type DecodeDailySpec = {
    id: number;
    goalId: number;
    userId: string;
    entryDate: string;
    todayWeight: number;
    mood: Nullable<EmojiKey>;
};

export const decodeDailySpec = (init: DailySpecType): DecodeDailySpec => ({
    id: init.id,
    goalId: init.goal_id,
    userId: init.user_id,
    entryDate: init.entry_date,
    todayWeight: init.today_weight ? init.today_weight : 0,
    mood: init.mood,
});
