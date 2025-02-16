import Icons from '@/assets';
import { ListRow, Text } from '../common';
import Link from 'next/link';

const MyPageHeader = () => {
    return (
        <div className="sticky top-0 z-10 bg-white p-2 mt-3">
            <ListRow
                left={
                    <Text bold size="xlg" color="var(--grey700)">
                        마이페이지
                    </Text>
                }
                right={
                    <Link href="/mypage/setting">
                        <Icons.Setting width={20} className="cursor-pointer" />
                    </Link>
                }
            />
        </div>
    );
};

export default MyPageHeader;
