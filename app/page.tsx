import styles from '../styles/pages/home.module.css';
import MainHeader from '@/components/layout/MainHeader';
import DailySummary from '@/components/DailySummary';

const Home = () => {
    return (
        <div>
            <MainHeader />
            <DailySummary />
        </div>
    );
};

export default Home;
