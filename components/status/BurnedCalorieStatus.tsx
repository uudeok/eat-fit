'use client';

import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { ListRow, Penel, Text } from '../common';

const BurnedCalorieStatus = () => {
    const { selectedDate } = useCalendarStore();

    return (
        <Penel direction="column" backgroundColor="var(--mainColorLg)">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        소모한 칼로리
                    </Text>
                }
                right={
                    <Text color="white" bold size="xlg">
                        0 Kcal
                    </Text>
                }
            />
        </Penel>
    );
};

export default BurnedCalorieStatus;
