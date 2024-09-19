import api from './supabase/client';

export const fetchGoalsInfo = async (user_id: string) => {
    return await api.selectData('goals', [
        { type: 'eq', args: ['user_id', user_id] },
        { type: 'eq', args: ['goal_status', 'progress'] },
    ]);
};
