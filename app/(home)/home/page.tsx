import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/today/TodaySummary';
import TodayMeals from '@/components/today/TodayMeals';
import TodayExercises from '@/components/today/TodayExercises';
import { GoalCompletionModal } from '@/components/modal';

const HomePage = async () => {
    return (
        <>
            {/* <GoalCompletionModal /> */}
            <MainHeader />

            <TodaySummary />

            <TodayMeals />
            <TodayExercises />
        </>
    );
};

export default HomePage;
