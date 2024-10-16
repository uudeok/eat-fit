import { API_ENDPOINTS } from './config';
import { CreateExercisesArgs, UpdateExercisesArgs } from '../@types';
import { decodeExercises, DecodeExercisesType } from '../mappers/exercisesMapper';

export async function fetchExercisesData(selectedDate: string): Promise<DecodeExercisesType> {
    const data = await fetch(`${API_ENDPOINTS.EXERCISES}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Exercises Data');
    }

    const result = await data.json();

    return decodeExercises(result);
}

export async function createExercises(exercisesData: CreateExercisesArgs) {
    const data = await fetch(`${API_ENDPOINTS.EXERCISES}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercisesData),
    });

    if (!data.ok) {
        throw new Error('Failed to create Exercises');
    }

    const result = await data.json();

    return result;
}

export async function updateExercises(updateData: UpdateExercisesArgs) {
    const data = await fetch(`${API_ENDPOINTS.EXERCISES}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!data.ok) {
        throw new Error('Failed to update exercises data');
    }

    const result = await data.json();

    return result;
}

export async function deleteExercises(exercisesId: number) {
    const data = await fetch(`${API_ENDPOINTS.EXERCISES}?id=${exercisesId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!data.ok) {
        throw new Error('Failed to delete the exercise');
    }

    const result = await data.json();

    return result;
}
