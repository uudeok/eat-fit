'use client';

import styles from '../../styles/modal/calendarModal.module.css';
import { useCalendar, useModal } from '@/hooks';
import Modal from '../common/Modal';
import Text from '../common/Text';
import Icons from '@/assets';
import dayjs from 'dayjs';
import Button from '../common/Button';
import { useState } from 'react';
import { ModalType } from '../common/Modals';
import { useCalendarStore } from '@/shared/store/useCalendarStore';

const CalendarModal = () => {
    const { isOpen, onClose } = useModal(ModalType.mainCalendar);
    const { weeks, body, prevMonthController, nextMonthController, curYear, curMonth } = useCalendar();
    const { selectedDate, setSelectedDate } = useCalendarStore();
    const [clickedDate, setClickedDate] = useState<Date>(selectedDate);

    const handleDate = (date: Date) => {
        setClickedDate(date);
    };

    const handleRedirectDate = () => {
        if (clickedDate) {
            setSelectedDate(clickedDate);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <div className={styles.controller}>
                    <Icons.ArrowLeft width={13} onClick={prevMonthController} />
                    <Text size="xlg" bold>
                        {curYear}. {curMonth + 1}
                    </Text>
                    <Icons.ArrowRight width={13} onClick={nextMonthController} />
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weeks.ko.map((week, index) => (
                                <th key={index}>{week}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {body.map((rows, index) => (
                            <tr key={index}>
                                {rows.map((row) => {
                                    const isToday = dayjs(row.date).isSame(dayjs(), 'day');
                                    const isClicked = dayjs(row.date).isSame(clickedDate, 'day');

                                    return (
                                        <td
                                            key={row.value}
                                            onClick={() => handleDate(row.date)}
                                            className={styles.date}
                                        >
                                            <button
                                                className={`${styles.dateCell} ${
                                                    row.monthLabel !== 'current' && styles.notCurrent
                                                } 
                                               
                                               `}
                                            >
                                                <Text bold size="sm">
                                                    {row.date.getDate()}
                                                </Text>

                                                {isClicked && <div className={styles.bubble}>선택</div>}
                                            </button>

                                            {isToday && row.monthLabel === 'current' && (
                                                <Text size="xsm" color="var(--grey500)">
                                                    오늘
                                                </Text>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.dateButton}>
                    <Button role="confirm" size="lg" onClick={handleRedirectDate}>
                        선택한 날짜로 이동
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CalendarModal;
