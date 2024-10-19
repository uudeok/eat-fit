'use client';

import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import { Text } from '../common';

const MyReportsHeader = () => {
    const router = useRouter();

    return (
        <div className="header px-2.5 py-2 cursor-pointer flex gap-4">
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />

            <div className="title flex gap-1 px-1.5 py-1.5">
                <Icons.FillReports width={20} />
                <Text bold size="xlg">
                    리포트
                </Text>
            </div>
        </div>
    );
};

export default MyReportsHeader;
