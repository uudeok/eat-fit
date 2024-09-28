import { createClient } from '@/shared/utils/supabase/server';
import { redirect } from 'next/navigation';

export const getGoalsData = async () => {
    const server = createClient();
    const { data: goalData } = await server.from('goals').select('*').eq('goal_status', 'progress');

    return goalData;
};

const GoalsPage = async () => {
    const goalData = await getGoalsData();

    if (goalData?.length) {
        redirect('/home');
    } else {
        redirect('/goals/register');
    }
};

export default GoalsPage;
