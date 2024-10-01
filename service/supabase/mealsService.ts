import { createClient } from '@/shared/utils/supabase/client';
import { CreateMealsArgs } from '../@types';

const client = createClient();

export async function fetchMealsData(selectedDate: Date) {
    const convertDate = selectedDate.toISOString();

    const { data } = await client.from('meals').select('*').eq('entry_date', convertDate).throwOnError();

    return data;
}

export async function createMeals({ daily_id, entry_date, meal_type, serving_time, meal }: CreateMealsArgs) {
    const { data } = await client
        .from('meals')
        .insert([
            {
                daily_id: daily_id,
                entry_date: entry_date.toISOString(),
                meal_type: meal_type,
                serving_time: serving_time,
                meal: meal,
            },
        ])
        .select()
        .throwOnError();

    return data;
}
