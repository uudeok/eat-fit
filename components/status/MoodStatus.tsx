'use client';

import { useModal } from '@/hooks';
import Image from 'next/image';
import { ModalType } from '../common/Modal/Modals';
import { ListRow, Penel, Text } from '../common';

const MoodStatus = () => {
    const { onOpen } = useModal(ModalType.todayMood);

    return (
        <Penel onClick={onOpen} backgroundColor="var(--mainColorLg)" direction="column">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        오늘의 기분
                    </Text>
                }
                right={<Image src="/emotion_fill_good.png" width="30" height="30" alt="emotion_good" />}
            />
        </Penel>
    );
};

export default MoodStatus;
