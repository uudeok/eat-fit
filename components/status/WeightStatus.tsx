import { useModal } from '@/hooks';
import { ListRow, Penel, Text } from '../common';
import { ModalType } from '../common/Modal/Modals';
import { useCalendarStore } from '@/shared/store/useCalendarStore';

const WeightStatus = () => {
    /* 선택한 날짜의 해당되는  daily 테이블 가져오기*/
    const { selectedDate } = useCalendarStore();
    const { onOpen } = useModal(ModalType.todayWeight);

    return (
        <Penel onClick={onOpen} direction="column" backgroundColor="var(--mainColorLg)">
            <ListRow
                left={
                    <Text color="var(--mainColorDk)" bold size="lg">
                        몸무게
                    </Text>
                }
                right={
                    <Text color="white" bold size="xlg">
                        60.05 kg
                    </Text>
                }
            />
        </Penel>
    );
};

export default WeightStatus;
