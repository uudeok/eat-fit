'use client';

import { Button } from './common/Button';
import EmptyState from './common/EmptyState';
import { useRouter } from 'next/navigation';

const Community = () => {
    const router = useRouter();

    return (
        <div className="mt-28">
            <EmptyState bottomText="준비중 입니다." />
            <Button onClick={() => router.push('/home')}>메인으로</Button>
        </div>
    );
};

export default Community;
