import { getGoalsData } from '@/app/(goals)/goals/page';
import MyPageHeader from '@/components/layout/MyPageHeader';
import MyPageGoals from '@/components/MyPageGoals';
import MyPageProfile from '@/components/MyPageProfile';

const Mypage = async () => {
    const goalData = await getGoalsData('progress');

    return (
        <div>
            <MyPageHeader />
            <MyPageProfile />
            <MyPageGoals goalData={goalData} />
        </div>
    );
};

export default Mypage;
