import { CreateExercisesArgs, UpdateExercisesArgs } from '../@types';
import { decodeExercises, DecodeExercisesType } from '../mappers/exercisesMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchExercisesData(selectedDate: string): Promise<DecodeExercisesType> {
    const data = await defaultFetch(`${API_ENDPOINTS.EXERCISES}?date=${selectedDate}`);

    const result = await data.json();

    return decodeExercises(result);
}

export async function createExercises(exercisesData: CreateExercisesArgs) {
    const data = await defaultFetch(`${API_ENDPOINTS.EXERCISES}`, {
        method: 'POST',
        body: JSON.stringify(exercisesData),
    });

    const result = await data.json();

    return result;
}

export async function updateExercises(updateData: UpdateExercisesArgs) {
    const data = await defaultFetch(`${API_ENDPOINTS.EXERCISES}`, { method: 'PUT', body: JSON.stringify(updateData) });

    const result = await data.json();

    return result;
}

export async function deleteExercises(exercisesId: number) {
    const data = await defaultFetch(`${API_ENDPOINTS.EXERCISES}?id=${exercisesId}`, { method: 'DELETE' });

    const result = await data.json();

    return result;
}
