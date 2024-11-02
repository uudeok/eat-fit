import MyPageEdit from '@/components/mypage/MyPageEdit';
import { decodeUser } from '@/service/mappers/userMapper';
import { API_ENDPOINTS } from '@/service/api/config';
import { headers } from 'next/headers';
import { defaultFetch } from '@/service/utils/defaultFetch';

export const dynamic = 'force-dynamic';

const getUserData = async () => {
    const data = await defaultFetch(`${API_ENDPOINTS.USERS}`, {
        headers: headers(),
        cache: 'no-store',
    });

    const result = await data.json();

    return decodeUser(result);
};

const MyPageEditPage = async () => {
    const userData = await getUserData();

    return <MyPageEdit userData={userData} />;
};

export default MyPageEditPage;
