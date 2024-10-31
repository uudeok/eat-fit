import { CreateGoalArgs, GoalStatusType } from '@/service/@types/req.type';
import { API_ENDPOINTS } from './config';
import { decodeGoal, DecodeGoalType } from '../mappers/goalMapper';

export async function fetchGoalsByStatus(status: GoalStatusType): Promise<DecodeGoalType> {
    const data = await fetch(`${API_ENDPOINTS.GOALS}?status=${status}`);

    if (!data.ok) {
        throw new Error('Failed to fetch Goals Data');
    }

    const result = await data.json();

    return decodeGoal(result);
}

export async function createNewGoals(goalData: CreateGoalArgs): Promise<DecodeGoalType> {
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

    return decodeGoal(result);
}
