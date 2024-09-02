import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/TodaySummary';
import TodayMeals from '@/components/TodayMeals';

const Home = () => {
    return (
        <div>
            <MainHeader />
            <TodaySummary />
            <TodayMeals />
        </div>
    );
};

export default Home;
