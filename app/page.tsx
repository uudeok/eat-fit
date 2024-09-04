import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/TodaySummary';
import TodayMeals from '@/components/TodayMeals';
import TodayExercises from '@/components/TodayExercises';

const Home = () => {
    return (
        <div>
            <MainHeader />
            <TodaySummary />
            <TodayMeals />
            <TodayExercises />
        </div>
    );
};

export default Home;
