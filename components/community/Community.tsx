'use client';

import EmptyState from '../common/EmptyState';
import { Button } from '../common/Button';
import { useRouter } from 'next/navigation';

const Community = () => {
    const router = useRouter();
    return (
        <div className="mt-28">
            <EmptyState bottomText="준비중 입니다." />

            <div className="w-44 m-auto">
                <Button onClick={() => router.push('/home')} role="round">
                    메인으로
                </Button>
            </div>
        </div>
    );
};

export default Community;
