import { GoalStatusType } from '@/service/@types';
import { API_ENDPOINTS } from '@/service/api/config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/** 서버에서 호출하기 위해서는 headers 객체를 생성해줘야 한다
 *  next/headers 는 page, layout 페이지에서만 호출이 가능하다 다른곳에서는 에러 발생
 */

const getGoalsData = async (status: GoalStatusType) => {
    const data = await fetch(`${API_ENDPOINTS.GOALS}?status=${status}`, {
        headers: headers(),
        cache: 'no-store',
    });

    if (!data.ok) {
        throw new Error('Failed to fetch goals data');
    }

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
