import { GoalRegisterType, GoalStatusType } from '@/service/@types/req.type';
import { API_ENDPOINTS } from './config';
import { GoalType } from '../@types/res.type';

export async function fetchGoalsByStatus(status: GoalStatusType): Promise<GoalType> {
    const data = await fetch(`${API_ENDPOINTS.GOALS}?status=${status}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Goals Data');
    }

    const result = await data.json();

    return result;
}

export async function createNewGoals(goalData: GoalRegisterType): Promise<GoalType> {
    const data = await fetch(`${API_ENDPOINTS.GOALS}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
    });

    if (!data.ok) {
        throw new Error('Failed to create Goals');
    }

    const result = await data.json();

    return result;
}
