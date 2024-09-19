import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/TodaySummary';
import TodayMeals from '@/components/TodayMeals';
import TodayExercises from '@/components/TodayExercises';

const Home = () => {
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
