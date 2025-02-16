import MyPageHeader from '@/components/mypage/MyPageHeader';
import MyFeed from '@/components/mypage/MyFeed';
import MyPageGoals from '@/components/mypage/MyPageGoals';
import MyPageOverview from '@/components/mypage/MyPageOverview';
import MyPageProfile from '@/components/mypage/MyPageProfile';

const MyPagePanel = () => {
    return (
        <div className="h-full flex flex-col">
            <div>
                <MyPageHeader />
                <MyPageProfile />
                <MyPageGoals />
                <MyPageOverview />
            </div>

            <div className="flex-grow">
                <MyFeed />
            </div>
        </div>
    );
};
export default MyPagePanel;
