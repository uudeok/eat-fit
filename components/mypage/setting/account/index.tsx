import Icons from '@/assets';
import { Text } from '@/components/common';
import Auth from './Auth';

const AccountLayout = () => {
    return (
        <div>
            <div className="flex border border-black p-1 gap-2">
                <Icons.FillSetting width={20} className="cursor-pointer" />
                <Text bold>계정 정보</Text>
            </div>
            <Auth />
        </div>
    );
};

export default AccountLayout;
