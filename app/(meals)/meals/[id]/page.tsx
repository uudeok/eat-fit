import MealsDetail from '@/components/MealsDetail';
import { MealsType } from '@/service/@types/res.type';
import { headers } from 'next/headers';

/**
 * 이런식으로 서버 사이드 렌더링에서 호출할 경우엔 headers 설정해줘야 한다
 * next/headers 는 서버 컴포넌트에서만 사용이 가능하다
 * 절대경로로 입력해줘야 한다
 *
 */

// export const dynamic = 'force-dynamic';

// const getMealsDetail = async (mealId: number): Promise<MealsType> => {
//     const data = await fetch(`http://localhost:3000/api/meals/${mealId}`, {
//         headers: headers(),
//         cache: 'no-store',
//     });

//     const result = await data.json();
//     return result;
// };

const MealsDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
    // const mealData = await getMealsDetail(Number(id));

    return <MealsDetail mealsId={id} />;
};

export default MealsDetailPage;
