import { decodeDailyStepInRange, decodeDailyStepList } from '../mappers/stepMapper';
import { API_ENDPOINTS } from './config';

export async function fetchDailyStep(selectedDate: string) {
    const data = await fetch(`${API_ENDPOINTS.DAILYSTEP}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch DailyStep Data');
    }

    const result = await data.json();

    return decodeDailyStepList(result);
}

export async function fetchDailyStepsInRange(startDate: string, endDate: string) {
    const data = await fetch(`${API_ENDPOINTS.DAILYSTEP}?startDate=${startDate}&endDate=${endDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch DailySteps Data');
    }

    const result = await data.json();

    return decodeDailyStepInRange(result);
}
