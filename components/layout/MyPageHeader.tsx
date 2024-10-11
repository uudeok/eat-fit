import Icons from '@/assets';
import { ListRow, Text } from '../common';

const MyPageHeader = () => {
    return (
        <div className="sticky top-0 z-10 bg-white p-2 mt-3">
            <ListRow
                left={
                    <Text bold size="xlg" color="var(--grey700)">
                        마이페이지
                    </Text>
                }
                right={<Icons.FillSetting width={20} className="cursor-pointer" />}
            />
        </div>
    );
};

export default MyPageHeader;
