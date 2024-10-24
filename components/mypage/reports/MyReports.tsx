import CaloriesChart from './CaloriesChart';
import GoalDdayChart from './GoalDdayChart';
import WeightChart from './WeightChart';
import ChatGPTAnalysis from './ChatGPTAnalysis';
import SectionHeader from '../../layout/SectionHeader';

const MyReports = () => {
    return (
        <>
            <SectionHeader iconName="FillReports" title="리포트" />

            <div className="flex flex-col gap-5 p-5 h-full box-border cursor-pointer bg-[#1a1a1a] rounded-lg">
                <GoalDdayChart />
                <CaloriesChart />
                <WeightChart />

                <ChatGPTAnalysis />
            </div>
        </>
    );
};

export default MyReports;
