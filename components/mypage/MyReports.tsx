import MyReportsHeader from '../layout/MyReportsHeader';
import CaloriesChart from './CaloriesChart';
import GoalDdayChart from './GoalDdayChart';
import ProgressEvaluator from './ProgressEvaluator';
import WeightChart from './WeightChart';

const MyReports = () => {
    return (
        <>
            <MyReportsHeader />

            <div className="flex flex-col gap-5 p-5 h-full box-border cursor-pointer bg-[#1a1a1a] rounded-lg">
                <GoalDdayChart />
                <CaloriesChart />
                <WeightChart />

                <ProgressEvaluator />
            </div>
        </>
    );
};

export default MyReports;
