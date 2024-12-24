'use client';

import Icons from '@/assets';
import { Text } from '@/components/common';
import { useRouter } from 'next/navigation';
import AccountLayout from './account';

const SettingLayout = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-5 p-5 relative h-full box-border cursor-pointer">
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />
            <div className="flex justify-center">
                <Text bold size="lg">
                    설정
                </Text>
            </div>

            <AccountLayout />
        </div>
    );
};

export default SettingLayout;
