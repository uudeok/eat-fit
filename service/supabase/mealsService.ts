import { createClient } from '@/shared/utils/supabase/client';
import { CreateMealsArgs, UpdateMealsArgs } from '../@types';
import { MealsType } from '../@types/res.type';

const client = createClient();

/* meal 타입이 Json[] 으로 나와서 올바른 타입으로 지정 */
export async function fetchMealsData(selectedDate: string): Promise<MealsType[] | null> {
    const { data } = (await client.from('meals').select('*').eq('entry_date', selectedDate).throwOnError()) as {
        data: MealsType[] | null;
    };

    return data;
}

export async function fetchMealsData2(selectedDate: string) {
    const data = await fetch(`/api/meals?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Data');
    }

    const result = await data.json();

    return result;
}

export async function createMeals({ daily_id, entry_date, meal_type, meal }: CreateMealsArgs) {
    const { data } = await client
        .from('meals')
        .insert([
            {
                daily_id: daily_id,
                entry_date: entry_date,
                meal_type: meal_type,
                meal: meal,
            },
        ])
        .select()
        .throwOnError();

    return data;
}

export async function fetchMealsDetail(mealId: number): Promise<MealsType> {
    const data = await fetch(`/api/meals/${mealId}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Detail Data');
    }

    const result = await data.json();
    return result;
}

/* meal id 로 특정 데이터 수정하기 */
export async function updateMeals(updateData: UpdateMealsArgs) {
    const { meal_type, serving_time, meal, photo_url, id } = updateData;

    const { data } = await client
        .from('meals')
        .update({
            meal_type: meal_type,
            serving_time: serving_time ? serving_time.toISOString() : null,
            meal: meal,
            photo_url: photo_url ? photo_url : null,
        })
        .eq('id', id)
        .throwOnError();
    // .maybeSingle()) as { data: MealsType };

    return data;
}
