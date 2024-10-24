import SectionHeader from '@/components/layout/SectionHeader';
import MyDiray from '@/components/mypage/overview/MyDiray';

const OverViewPage = () => {
    return (
        <>
            <SectionHeader title="모아보기" iconName="FillBar" />
            <MyDiray />
        </>
    );
};

export default OverViewPage;
