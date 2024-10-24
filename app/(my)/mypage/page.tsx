import MyPageHeader from '@/components/layout/MyPageHeader';
import MyPageGoals from '@/components/mypage/MyPageGoals';
import MyPageOverview from '@/components/mypage/MyPageOverview';
import MyPageProfile from '@/components/mypage/MyPageProfile';

const Mypage = async () => {
    return (
        <div>
            <MyPageHeader />
            <MyPageProfile />
            <MyPageGoals />
            <MyPageOverview />
        </div>
    );
};

export default Mypage;
