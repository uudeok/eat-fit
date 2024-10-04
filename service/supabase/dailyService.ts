import { createClient } from '@/shared/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { DailySpecType, DailyStepType } from '../@types/res.type';
import { CreateDailySpecArgs, UpdateDailySpecArgs } from '../@types';

const client = createClient();

export async function fetchDailySpec(selectedDate: Date, fetch?: SupabaseClient): Promise<DailySpecType | null> {
    const supabase = fetch || client;
    const convertDate = selectedDate.toISOString();

    const { data } = await supabase
        .from('dailySpec')
        .select('*')
        .eq('entry_date', convertDate)
        .throwOnError()
        .maybeSingle();

    return data;
}

export async function createDailySpec({ goal_id, entry_date, today_weight, mood }: CreateDailySpecArgs) {
    const { data } = await client
        .from('dailySpec')
        .insert([
            {
                goal_id: goal_id,
                entry_date: entry_date.toISOString(),
                today_weight: today_weight,
                mood: mood,
            },
        ])
        .select()
        .throwOnError()
        .maybeSingle();

    return data;
}

export async function updateDailySpec(updateData: UpdateDailySpecArgs) {
    const { id, mood, today_weight } = updateData;

    const { data } = await client
        .from('dailySpec')
        .update({
            mood: mood,
            today_weight: today_weight,
        })
        .eq('id', id)
        .select()
        .throwOnError();

    return data;
}

/* dailySpec 밑으로 Meals, Exercises 테이블 가져오기 */
export async function fetchDailyStep(selectedDate: Date, fetch?: SupabaseClient): Promise<DailyStepType> {
    const supabase = fetch || client;

    const { data } = (await supabase
        .from('dailySpec')
        .select(
            `
             *,
                meals (
                    id,
                    meal_type,
                    serving_time,
                    meal,
                    photo_url               
                )
            `
        )
        .eq('entry_date', selectedDate.toISOString())
        .throwOnError()
        .maybeSingle()) as { data: DailyStepType };

    return data;
}
