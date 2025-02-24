import MainHeader from '@/components/layout/MainHeader';
import TodaySummary from '@/components/today/TodaySummary';
import TodayMeals from '@/components/today/TodayMeals';
import TodayExercises from '@/components/today/TodayExercises';

async function getMovies() {
    const response = await fetch('https://nomad-movies.nomadcoders.workers.dev/movies');
    const result = await response.json();
    return result;
}

const HomePage = async () => {
    const data = await getMovies();
    console.log('movie', data);

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
