'use client';

import Profile from '../common/Profile';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';

const MyPageProfile = () => {
    const router = useRouter();

    return (
        <div className="p-5 rounded-md bg-gray-100">
            <Profile size="lg" direction="vertical" />
            <div className="w-[130px] mx-auto">
                <Button role="round" size="sm" onClick={() => router.push('/mypage/edit')}>
                    프로필 편집
                </Button>
            </div>
        </div>
    );
};

export default MyPageProfile;
