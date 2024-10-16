import MealsDetail from '@/components/MealsDetail';

const MealsDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
    return <MealsDetail mealsId={id} />;
};

export default MealsDetailPage;
