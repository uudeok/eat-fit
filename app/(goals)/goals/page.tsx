import { GoalStatusType } from '@/service/@types';
import { API_ENDPOINTS } from '@/service/api/config';
import { defaultFetch } from '@/service/utils/defaultFetch';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const getGoalsData = async (status: GoalStatusType) => {
    const data = await defaultFetch(`${API_ENDPOINTS.GOALS}?status=${status}`, {
        headers: headers(),
        cache: 'no-store',
    });

    const result = await data.json();
    return result;
};

const GoalsPage = async () => {
    const goalData = await getGoalsData('progress');

    if (goalData) {
        redirect('/home');
    } else {
        redirect('/goals/register');
    }
};

export default GoalsPage;
