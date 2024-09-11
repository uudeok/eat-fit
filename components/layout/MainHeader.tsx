'use client';

import styles from '@styles/layout/mainHeader.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import ModeToggle from '../utils/ModeToggle';
import Alarm from '../utils/Alarm';
import { useCalendar, useModal } from '@/hooks';
import { ModalType } from '../common/Modal/Modals';
import { Text } from '../common';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
dayjs.locale('ko');

const MainHeader = () => {
    const { onOpen } = useModal(ModalType.mainCalendar);
    const { nextDateController, prevDateController } = useCalendar();
    const { selectedDate } = useCalendarStore();

    const dateLabel = dayjs(selectedDate).format('M.D');
    const dayOfWeek = dayjs(selectedDate).format('ddd');
    const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>
                    {/* <ModeToggle />
                     */}
                    <Alarm />
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.calendar}>
                    <div onClick={prevDateController} className={styles.controller}>
                        <Icons.ArrowLeft width={15} />
                    </div>
                    <div className={styles.dateLabel} onClick={onOpen}>
                        <Image src="/calendar.png" alt="calendar icon" width={20} height={15} />
                        <Text bold>{isToday ? '오늘' : `${dateLabel} (${dayOfWeek})`}</Text>
                        <Icons.Down width={10} />
                    </div>
                    <div onClick={nextDateController} className={styles.controller}>
                        <Icons.ArrowRight width={15} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
