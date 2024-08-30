import MainHeader from '@/components/layout/MainHeader';
import DailySummary from '@/components/DailySummary';
import TodayMeals from '@/components/TodayMeals';

const Home = () => {
    return (
        <div>
            <MainHeader />
            <DailySummary />
            <TodayMeals />
        </div>
    );
};

export default Home;
