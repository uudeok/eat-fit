import MyPageEdit from '@/components/mypage/MyPageEdit';
import { API_ENDPOINTS } from '@/service/supabase/config';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const getUserData = async () => {
    const data = await fetch(`${API_ENDPOINTS.USERS}`, {
        headers: headers(),
        cache: 'no-store',
    });

    if (!data.ok) {
        throw new Error('Failed to fetch User Data');
    }

    const result = await data.json();

    return result;
};

const MyPageEditPage = async () => {
    const userData = await getUserData();

    return <MyPageEdit userData={userData} />;
};

export default MyPageEditPage;
