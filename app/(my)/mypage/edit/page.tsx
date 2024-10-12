import MyPageEdit from '@/components/MyPageEdit';
import { API_ENDPOINTS } from '@/service/supabase/config';
import { headers } from 'next/headers';

const getUserData = async () => {
    const data = await fetch(`${API_ENDPOINTS.USERS}`, {
        headers: headers(),
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
