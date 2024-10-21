'use client';

import Icons, { IconType } from '@/assets';
import { useRouter } from 'next/navigation';
import { Text } from '../common';

export type Props = {
    iconName?: IconType;
    title: string;
};

const MyOverViewHeader = ({ iconName, title }: Props) => {
    const router = useRouter();

    const DynamicIcon = iconName ? Icons[iconName] : Icons['Bar'];

    return (
        <div className="px-2.5 py-2 cursor-pointer flex gap-4">
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />

            <div className="title flex gap-1 px-1.5 py-1.5">
                <DynamicIcon width={22} />

                <Text bold size="xxlg">
                    {title}
                </Text>
            </div>
        </div>
    );
};

export default MyOverViewHeader;
