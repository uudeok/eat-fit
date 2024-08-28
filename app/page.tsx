import styles from '../styles/pages/home.module.css';
import MainHeader from '@/components/layout/MainHeader';
import TodayMeal from '@/components/TodayMeal';

const Home = () => {
    return (
        <div>
            <MainHeader />
            <TodayMeal />
            <TodayMeal />
            <TodayMeal />
        </div>
    );
};

export default Home;
