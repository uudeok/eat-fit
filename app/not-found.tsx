'use client';

import { Button } from '@/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 h-full">
            <Image src="/images/oops.png" alt="Not Found" width={130} height={130} className="mb-6 opacity-90" />
            <p className="text-gray-600 mb-8 text-center max-w-md font-bold">
                요청하신 페이지가 존재하지 않거나 삭제되었습니다.
            </p>

            <Button role="round" onClick={() => router.replace('/home')}>
                메인으로 돌아가기
            </Button>
        </div>
    );
};

export default NotFound;
