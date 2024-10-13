import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/today/TodaySummary';
import TodayMeals from '@/components/today/TodayMeals';
import TodayExercises from '@/components/today/TodayExercises';

const HomePage = async () => {
    return (
        <>
            <MainHeader />

            <TodaySummary />

            <TodayMeals />
            <TodayExercises />
        </>
    );
};

export default HomePage;
