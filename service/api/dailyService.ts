import { CreateDailySpecArgs, UpdateDailySpecArgs } from '../@types';
import { API_ENDPOINTS } from './config';
import { DecodeDailySpec, decodeDailySpec } from '../mappers/dailyMapper';

export async function fetchDailySpec(selectedDate: string): Promise<DecodeDailySpec> {
    const data = await fetch(`${API_ENDPOINTS.DAILYSPEC}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Faild to fetch dailySpec data');
    }

    const result = await data.json();

    return decodeDailySpec(result);
}

export async function createDailySpec(dailySpecData: CreateDailySpecArgs): Promise<DecodeDailySpec> {
    const data = await fetch(`${API_ENDPOINTS.DAILYSPEC}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dailySpecData),
    });
    if (!data.ok) {
        throw new Error('Failed to create dailySpec');
    }

    const result = await data.json();

    return decodeDailySpec(result);
}

export async function updateDailySpec(updatedData: UpdateDailySpecArgs): Promise<DecodeDailySpec> {
    const data = await fetch(`${API_ENDPOINTS.DAILYSPEC}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!data.ok) {
        throw new Error('Failed to update dailySpec data');
    }

    const result = await data.json();

    return decodeDailySpec(result);
}
