import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/TodaySummary';
import TodayMeals from '@/components/TodayMeals';
import TodayExercises from '@/components/TodayExercises';

const Home = () => {
    /* 진입 시 */
    /* goal 테이블에서 user_id 로 진행중인 목표가 있는 조회 (goal_status : progress) */
    /* goal_id 를 저장 */

    return (
        <>
            <MainHeader />
            <TodaySummary />
            <TodayMeals />
            <TodayExercises />
        </>
    );
};

export default Home;
