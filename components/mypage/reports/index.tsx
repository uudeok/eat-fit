import Page from '@/components/common/Page';
import SectionHeader from '@/components/layout/SectionHeader';
import ProcessCard from './ProgressCard';
import CaloriesCard from './CaloriesCard';
import WeightCard from './WeightCard';
import ChatGPTCard from './ChatGPTCard';

const ReportPage = () => {
    return (
        <Page header={<SectionHeader iconName="FillReports" title="리포트" />}>
            <div className="flex flex-col gap-5 p-5 h-full box-border cursor-pointer bg-[#1a1a1a] rounded-lg">
                <ProcessCard />
                <CaloriesCard />
                <WeightCard />
                <ChatGPTCard />
            </div>
        </Page>
    );
};

export default ReportPage;
