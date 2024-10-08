'use client';

import { useModal } from '@/hooks';
import Image from 'next/image';
import { ModalType } from '../common/Modal/OverlayContainer';
import { ListRow, Penel, Text } from '../common';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';

const MoodStatus = () => {
    const { onOpen } = useModal(ModalType.todayMood);
    const { getFormattedDate } = useSelectedDateStore();

    const formattedDate = getFormattedDate();

    const { data: dailySpec } = useFetchDailySpec(formattedDate);

    return (
        <Penel onClick={onOpen} backgroundColor="var(--mainColorLg)" direction="column">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        오늘의 기분
                    </Text>
                }
                right={
                    dailySpec?.mood ? (
                        <Image src={`/emotion_fill_${dailySpec.mood}.png`} width={30} height={30} alt="mood" />
                    ) : (
                        <Image src="/question.png" alt="mood" width={30} height={30} />
                    )
                }
            />
        </Penel>
    );
};

export default MoodStatus;
