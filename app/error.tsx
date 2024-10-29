'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="responsiveHeight item-center flex flex-col justify-center text-center">
            <div>
                <h2 className="text-3xl font-semibold text-point-purple">Something went wrong!</h2>
                <p className="mt-4 font-semibold text-gray-500">해당 페이지를 가져오던 중 문제가 생겼습니다.</p>
                <p className="mx-auto mt-8 max-w-lg text-xs text-input-border-color">
                    Error Message: {error?.message || '없음'}
                </p>
                <div className="mt-8">
                    <button
                        className="rounded-lg bg-point-purple px-4 py-2.5 text-white hover:bg-button-hover-color hover:shadow-lg"
                        onClick={() => reset()}
                    >
                        다시 시도하기
                    </button>
                </div>
            </div>
        </div>
    );
}
