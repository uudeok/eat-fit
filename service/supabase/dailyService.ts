import { createClient } from '@/shared/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { DailySpecType, DailyStepType } from '../@types/res.type';
import { CreateDailySpecArgs, UpdateDailySpecArgs } from '../@types';
import { API_ENDPOINTS } from './config';

const client = createClient();

export async function fetchDailySpec(selectedDate: string): Promise<DailySpecType> {
    const data = await fetch(`${API_ENDPOINTS.DAILYSPEC}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Faild to fetch dailySpec data');
    }

    const result = await data.json();
    return result;
}

export async function createDailySpec(dailySpecData: CreateDailySpecArgs): Promise<DailySpecType> {
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

    return result;
}

export async function updateDailySpec(updatedData: UpdateDailySpecArgs): Promise<DailySpecType> {
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

    return result;
}

export async function fetchDailyStep(selectedDate: string) {
    const data = await fetch(`${API_ENDPOINTS.DAILYSTEP}?date=${selectedDate}`);

    if (!data.ok) {
        throw new Error('Failed to fetch DailyStep Data');
    }

    const result = await data.json();

    return result;
}
