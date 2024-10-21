import MyOverViewHeader from '../layout/MyOverviewHeader';
import CaloriesChart from './CaloriesChart';
import GoalDdayChart from './GoalDdayChart';
import WeightChart from './WeightChart';
import AIEvaluator from './AIEvaluator';

const MyReports = () => {
    return (
        <>
            <MyOverViewHeader iconName="FillReports" title="리포트" />

            <div className="flex flex-col gap-5 p-5 h-full box-border cursor-pointer bg-[#1a1a1a] rounded-lg">
                <GoalDdayChart />
                <CaloriesChart />
                <WeightChart />

                <AIEvaluator />
            </div>
        </>
    );
};

export default MyReports;
