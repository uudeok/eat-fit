import { CreateMealsArgs, UpdateMealsArgs } from '../@types';
import { MealsType } from '../@types/res.type';
import { decodeMeals, decodeMealsList, DecodeMealsListType, DecodeMealsType } from '../mappers/mealsMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchMealsData(selectedDate: string): Promise<DecodeMealsListType> {
    const data = await defaultFetch(`${API_ENDPOINTS.MEALS}?date=${selectedDate}`);

    const result = await data.json();

    return decodeMealsList(result);
}

export async function fetchMealsDetail(mealId: number): Promise<DecodeMealsType> {
    const data = await defaultFetch(`${API_ENDPOINTS.MEALS}/${mealId}`);

    const result = await data.json();

    return decodeMeals(result);
}

export async function createMeals(mealData: CreateMealsArgs) {
    const data = await defaultFetch(`${API_ENDPOINTS.MEALS}`, { method: 'POST', body: JSON.stringify(mealData) });

    const result = await data.json();

    return result;
}

export async function updateMeals(updateData: UpdateMealsArgs): Promise<MealsType> {
    const data = await defaultFetch(`${API_ENDPOINTS.MEALS}`, { method: 'PUT', body: JSON.stringify(updateData) });

    const result = await data.json();

    return result;
}

export async function deleteMeals(mealId: number): Promise<{ message: string }> {
    const data = await defaultFetch(`${API_ENDPOINTS.MEALS}/${mealId}`, { method: 'DELETE' });

    const result = await data.json();

    return result;
}
