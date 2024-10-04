import { createClient } from '@/shared/utils/supabase/client';
import { CreateMealsArgs, UpdateMealsArgs } from '../@types';
import { MealsType } from '../@types/res.type';

const client = createClient();

/* meal 타입이 Json[] 으로 나와서 올바른 타입으로 지정 */
export async function fetchMealsData(selectedDate: Date): Promise<MealsType[] | null> {
    const convertDate = selectedDate.toISOString();

    const { data } = (await client.from('meals').select('*').eq('entry_date', convertDate).throwOnError()) as {
        data: MealsType[] | null;
    };

    return data;
}

export async function createMeals({ daily_id, entry_date, meal_type, meal }: CreateMealsArgs) {
    const { data } = await client
        .from('meals')
        .insert([
            {
                daily_id: daily_id,
                entry_date: entry_date.toISOString(),
                meal_type: meal_type,
                meal: meal,
            },
        ])
        .select()
        .throwOnError();

    return data;
}

/* meal id 로 특정 데이터 가져오기 */
export async function fetchMealsDetail(mealId: number): Promise<MealsType | null> {
    const { data } = (await client.from('meals').select('*').eq('id', mealId).throwOnError().maybeSingle()) as {
        data: MealsType;
    };

    return data;
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
