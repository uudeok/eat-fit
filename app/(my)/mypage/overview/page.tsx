import MyOverViewHeader from '@/components/layout/MyOverviewHeader';
import OverView from '@/components/mypage/OverView';

const OverViewPage = () => {
    return (
        <>
            <MyOverViewHeader title="모아보기" iconName="FillBar" />
            <OverView />
        </>
    );
};

export default OverViewPage;
