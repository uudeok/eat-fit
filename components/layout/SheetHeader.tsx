import { ListRow, Text } from '../common';
import Icons from '@/assets';

type Props = {
    content: string;
    onClose: () => void;
};

const SheetHeader = ({ content, onClose }: Props) => {
    return (
        <ListRow
            left={
                <Text bold size="xlg">
                    {content}
                </Text>
            }
            right={<Icons.FillXmark width={24} onClick={onClose} />}
        />
    );
};

export default SheetHeader;
