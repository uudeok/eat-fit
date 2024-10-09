import { createClient } from '@/shared/utils/supabase/client';
import { CreateMealsArgs, UpdateMealsArgs } from '../@types';
import { MealsType } from '../@types/res.type';

const client = createClient();

export async function fetchMealsData(selectedDate: string): Promise<MealsType[]> {
    const data = await fetch(`/api/meals?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Data');
    }

    const result = await data.json();

    return result;
}

export async function fetchMealsDetail(mealId: number): Promise<MealsType> {
    const data = await fetch(`/api/meals/${mealId}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Meals Detail Data');
    }

    const result = await data.json();

    return result;
}

export async function createMeals(mealData: CreateMealsArgs) {
    const response = await fetch('/api/meals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
    });

    if (!response.ok) {
        throw new Error('Failed to create Meal');
    }

    const result = await response.json();

    return result;
}

export async function updateMeals(updateData: UpdateMealsArgs): Promise<MealsType> {
    const response = await fetch('/api/meals', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error('Failed to update meal data');
    }

    const result = await response.json();

    return result;
}

export async function deleteMeals(mealId: number): Promise<{ message: string }> {
    const response = await fetch('/api/meals', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mealId }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete the meal');
    }

    const result = await response.json();

    return result;
}
