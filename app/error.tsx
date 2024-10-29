'use client';

import { Button } from '@/components/common/Button';
import { sendErrorMail } from '@/service/api/\bmailService';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const handleSendErrorMail = async () => {
            try {
                await sendErrorMail({ errorLocation: path, errorMessage: error.message });
            } catch (sendError) {
                console.error('Failed to send error email:', sendError);
            }
        };

        handleSendErrorMail();
        console.error('Logged error:', error);
    }, [error, path]);
    return (
        <div className="responsiveHeight item-center flex flex-col justify-center text-center p-5">
            <div>
                <h2 className="text-3xl font-semibold text-point-purple">Something went wrong!</h2>
                <p className="mt-4 font-semibold text-gray-500">해당 페이지를 가져오던 중 문제가 생겼습니다.</p>
                <p className="mx-auto mt-8 mb-8 max-w-lg text-xs text-input-border-color">
                    Error Message: {error?.message || '없음'}
                </p>
                <Image src="/oops.png" alt="error" width={100} height={100} />
                <div className="mt-8 p-4 flex flex-col gap-5">
                    <Button role="round" onClick={() => router.replace('/home')}>
                        홈으로
                    </Button>
                    <Button role="round" onClick={() => reset()}>
                        다시 시도하기
                    </Button>
                </div>
            </div>
        </div>
    );
}
