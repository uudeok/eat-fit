import { fetchGoalsInprogress } from '@/service/supabase/goalsService';
import { createClient } from '@/shared/utils/supabase/server';
import { redirect } from 'next/navigation';

export const getGoalsData = async () => {
    const server = createClient();
    const goalData = await fetchGoalsInprogress(server);

    return goalData;
};

const GoalsPage = async () => {
    const goalData = await getGoalsData();

    if (goalData) {
        redirect('/home');
    } else {
        redirect('/goals/register');
    }
};

export default GoalsPage;
