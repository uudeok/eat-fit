'use client';

import { useModal } from '@/hooks';
import { ListRow, Penel, Text } from '../common';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const WeightStatus = () => {
    const { selectedDate } = useSelectedDateStore();
    const { onOpen } = useModal(ModalType.todayWeight);

    const formattedDate = dayjs(selectedDate).format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySpec } = useFetchDailySpec(formattedDate);

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
