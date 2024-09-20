'use client';

import styles from '@styles/layout/mainHeader.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import { useCalendar, useModal } from '@/hooks';
import { ModalType } from '../common/Modal/Modals';
import { Alarm, List, ListRow, Text } from '../common';
import dayjs from 'dayjs';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import 'dayjs/locale/ko';
import { DATE_FORMAT } from '@/constants';
dayjs.locale('ko');

const MainHeader = () => {
    const { onOpen } = useModal(ModalType.mainCalendar);
    const { nextDateController, prevDateController } = useCalendar();
    const { selectedDate } = useCalendarStore();

    const dateLabel = dayjs(selectedDate).format(DATE_FORMAT['M.D']);
    const dayOfWeek = dayjs(selectedDate).format(DATE_FORMAT.ddd);
    const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>
                    <Alarm />
                </div>
            </div>

            <div className={styles.bottom}>
                <List className={styles.calendar}>
                    <ListRow
                        left={
                            <div onClick={prevDateController}>
                                <Icons.ArrowLeft width={15} />
                            </div>
                        }
                        middle={
                            <div className={styles.dateLabel} onClick={onOpen}>
                                <Image src="/calendar.png" alt="calendar icon" width={20} height={15} />
                                <Text bold>{isToday ? '오늘' : `${dateLabel} (${dayOfWeek})`}</Text>
                                <Icons.Down width={10} />
                            </div>
                        }
                        right={
                            <div onClick={nextDateController}>
                                <Icons.ArrowRight width={15} />
                            </div>
                        }
                    />
                </List>
            </div>
        </div>
    );
};

export default MainHeader;
