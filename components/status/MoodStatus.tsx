'use client';

import { useModal } from '@/hooks';
import Image from 'next/image';
import { ModalType } from '../common/Modal/OverlayContainer';
import { ListRow, Penel, Text } from '../common';
import { useCalendarStore } from '@/shared/store/useCalendarStore';

const MoodStatus = () => {
    /* 선택한 날짜의 해당되는  daily 테이블 가져오기*/
    const { selectedDate } = useCalendarStore();
    const { onOpen } = useModal(ModalType.todayMood);

    return (
        <Penel onClick={onOpen} backgroundColor="var(--mainColorLg)" direction="column">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        오늘의 기분
                    </Text>
                }
                right={<Image src="/emotion_fill_good.png" width="30" height="30" alt="emoji" />}
            />
        </Penel>
    );
};

export default MoodStatus;
