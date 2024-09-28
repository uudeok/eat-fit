'use client';

import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { ListRow, Penel, Text } from '../common';

const BurnedCalorieStatus = () => {
    /* 선택한 날짜의 해당되는  daily, exercise 테이블 가져오기*/
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
