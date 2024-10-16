import { CreateMealsArgs, UpdateMealsArgs } from '../@types';
import { MealsType } from '../@types/res.type';
import { decodeMeals, decodeMealsList, DecodeMealsListType, DecodeMealsType } from '../mappers/mealsMapper';
import { API_ENDPOINTS } from './config';

export async function fetchMealsData(selectedDate: string): Promise<DecodeMealsListType> {
    const data = await fetch(`${API_ENDPOINTS.MEALS}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Data');
    }

    const result = await data.json();

    return decodeMealsList(result);
}

export async function fetchMealsDetail(mealId: number): Promise<DecodeMealsType> {
    const data = await fetch(`${API_ENDPOINTS.MEALS_DETAIL(mealId)}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Detail Data');
    }

    const result = await data.json();

    return decodeMeals(result);
}

export async function createMeals(mealData: CreateMealsArgs) {
    const data = await fetch(`${API_ENDPOINTS.MEALS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
    });

    if (!data.ok) {
        throw new Error('Failed to create Meal');
    }

    const result = await data.json();

    return result;
}

export async function updateMeals(updateData: UpdateMealsArgs): Promise<MealsType> {
    const data = await fetch(`${API_ENDPOINTS.MEALS}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!data.ok) {
        throw new Error('Failed to update meal data');
    }

    const result = await data.json();

    return result;
}

export async function deleteMeals(mealId: number): Promise<{ message: string }> {
    const data = await fetch(`${API_ENDPOINTS.MEALS_DETAIL(mealId)}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!data.ok) {
        throw new Error('Failed to delete the Meals');
    }

    const result = await data.json();

    return result;
}
