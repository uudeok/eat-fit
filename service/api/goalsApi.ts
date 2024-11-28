import { CreateGoalArgs, GoalStatusType } from '@/service/@types/req.type';
import { decodeGoal, DecodeGoalType } from '../mappers/goalMapper';
import { defaultFetch } from '../utils/defaultFetch';
import { API_ENDPOINTS } from './config';

export async function fetchGoalsByStatus(status: GoalStatusType): Promise<DecodeGoalType> {
    const data = await defaultFetch(`${API_ENDPOINTS.GOALS}?status=${status}`);

    const result = await data.json();

    return decodeGoal(result);
}

export async function createNewGoals(goalData: CreateGoalArgs): Promise<DecodeGoalType> {
    const data = await defaultFetch(`${API_ENDPOINTS.GOALS}`, { method: 'POST', body: JSON.stringify(goalData) });

    const result = await data.json();

    return decodeGoal(result);
}
