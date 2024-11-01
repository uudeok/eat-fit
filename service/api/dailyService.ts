import { CreateDailySpecArgs, UpdateDailySpecArgs } from '../@types';
import { DecodeDailySpec, decodeDailySpec } from '../mappers/dailyMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchDailySpec(selectedDate: string): Promise<DecodeDailySpec> {
    const data = await defaultFetch(`${API_ENDPOINTS.DAILYSPEC}?date=${selectedDate}`);

    const result = await data.json();

    return decodeDailySpec(result);
}

export async function createDailySpec(dailySpecData: CreateDailySpecArgs): Promise<DecodeDailySpec> {
    const data = await defaultFetch(`${API_ENDPOINTS.DAILYSPEC}`, {
        method: 'POST',
        body: JSON.stringify(dailySpecData),
    });

    const result = await data.json();

    return decodeDailySpec(result);
}

export async function updateDailySpec(updatedData: UpdateDailySpecArgs): Promise<DecodeDailySpec> {
    const data = await defaultFetch(`${API_ENDPOINTS.DAILYSPEC}`, { method: 'PUT', body: JSON.stringify(updatedData) });

    const result = await data.json();

    return decodeDailySpec(result);
}
