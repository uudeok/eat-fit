'use client';

import { useModal } from '@/hooks';
import { ListRow, Penel, Text } from '../common';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';

const WeightStatus = () => {
    const { selectedDate } = useCalendarStore();
    const { onOpen } = useModal(ModalType.todayWeight);

    const { data: dailySpec } = useFetchDailySpec(selectedDate);

    return (
        <Penel onClick={onOpen} direction="column" backgroundColor="var(--mainColorLg)">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        몸무게
                    </Text>
                }
                right={
                    dailySpec?.today_weight ? (
                        <Text color="white" bold size="xlg">
                            {dailySpec?.today_weight} kg
                        </Text>
                    ) : (
                        <Text color="white" bold size="xlg">
                            0 kg
                        </Text>
                    )
                }
            />
        </Penel>
    );
};

export default WeightStatus;
