import MyPageHeader from '@/components/layout/MyPageHeader';
import MyPageGoals from '@/components/mypage/MyPageGoals';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import WeekMission from '@/components/mypage/WeekMission';
import { GoalStatusType } from '@/service/@types';
import { API_ENDPOINTS } from '@/service/supabase/config';
import { headers } from 'next/headers';

const getGoalsData = async (status: GoalStatusType) => {
    const data = await fetch(`${API_ENDPOINTS.GOALS}?status=${status}`, {
        headers: headers(),
        cache: 'no-store',
    });

    const result = await data.json();
    return result;
};

const Mypage = async () => {
    const goalData = await getGoalsData('progress');

    return (
        <div>
            <MyPageHeader />
            <MyPageProfile />
            <MyPageGoals goalData={goalData} />
            <WeekMission />
        </div>
    );
};

export default Mypage;
