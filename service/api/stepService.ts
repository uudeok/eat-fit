import { decodeDailyStepInRange, decodeDailyStepList } from '../mappers/stepMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchDailyStep(selectedDate: string) {
    const data = await defaultFetch(`${API_ENDPOINTS.DAILYSTEP}?date=${selectedDate}`);

    const result = await data.json();

    return decodeDailyStepList(result);
}

export async function fetchDailyStepsInRange(startDate: string, endDate: string) {
    const data = await defaultFetch(`${API_ENDPOINTS.DAILYSTEP}?startDate=${startDate}&endDate=${endDate}`);

    const result = await data.json();

    return decodeDailyStepInRange(result);
}
