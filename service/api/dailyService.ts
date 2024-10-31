import { CreateDailySpecArgs, UpdateDailySpecArgs } from '../@types';
import { API_ENDPOINTS } from './config';
import { DecodeDailySpec, decodeDailySpec } from '../mappers/dailyMapper';
import { defaultFetch } from '../utils/createFetch';

export async function fetchDailySpec(selectedDate: string): Promise<DecodeDailySpec> {
    const data = await fetch(`${API_ENDPOINTS.DAILYSPEC}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Faild to fetch dailySpec data');
    }

    const result = await data.json();

    return decodeDailySpec(result);
}

// export async function createDailySpec2(dailySpecData: CreateDailySpecArgs) {
//     const data = await defaultFetch('/dailySpec', {
//         method: 'POST',
//         body: JSON.stringify(dailySpecData),
//     });

//     return data.json();
// }

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

// export async function updateDailySpec2(updatedData: UpdateDailySpecArgs) {
//     const data = await defaultFetch('/dailySpec', {
//         method: 'PUT',
//         body: JSON.stringify(updatedData),
//     });

//     const result = await data.json();

//     console.log('@', result);
//     return result;
// }

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
