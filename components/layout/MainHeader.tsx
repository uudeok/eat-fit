'use client';

import styles from '@styles/layout/mainHeader.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import { useCalendar, useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Alarm, List, ListRow, Text } from '../common';
import dayjs from 'dayjs';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { DATE_FORMAT } from '@/constants';
dayjs.locale('ko');
import 'dayjs/locale/ko';

const MainHeader = () => {
    const { onOpen } = useModal(ModalType.mainCalendar);
    const { selectedDate } = useSelectedDateStore();

    const { handleNextDay, handlePreviousDay } = useCalendar();

    const dateLabel = dayjs(selectedDate).format(DATE_FORMAT['M.D']);
    const dayOfWeek = dayjs(selectedDate).format(DATE_FORMAT.ddd);
    const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>{/* <Alarm /> */}</div>
            </div>

            <div className={styles.bottom}>
                <List className={styles.calendar}>
                    <ListRow
                        left={
                            <div onClick={handlePreviousDay}>
                                <Icons.ArrowLeft width={15} />
                            </div>
                        }
                        middle={
                            <div className={styles.dateLabel} onClick={onOpen}>
                                <Image src="/images/calendar.png" alt="calendar icon" width={20} height={15} />
                                <Text bold>{isToday ? '오늘' : `${dateLabel} (${dayOfWeek})`}</Text>
                                <Icons.Down width={10} />
                            </div>
                        }
                        right={
                            <div onClick={handleNextDay}>
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
