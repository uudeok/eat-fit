import Image from 'next/image';
import Text from './Text';

type Props = {
    bottomText?: string;
};

const EmptyState = ({ bottomText }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <Image src="/empty2.png" alt="empty" width={100} height={100} />
            {bottomText != null ? (
                <Text bold size="sm" color="var(--grey700)">
                    {bottomText}
                </Text>
            ) : null}
        </div>
    );
};

export default EmptyState;
