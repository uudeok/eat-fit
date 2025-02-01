'use client';

import styles from '@styles/modal/calendarModal.module.css';
import { useCalendar, useModal } from '@/hooks';
import Icons from '@/assets';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { Modal } from '../common/Modal';
import { ListRow, Text } from '../common';
import { Button } from '../common/Button';

const CalendarModal = () => {
    const { isOpen, onClose } = useModal(ModalType.mainCalendar);

    const { selectedDate, setSelectedDate } = useSelectedDateStore();
    const { weekLabels, dateCells, handlePreviousMonth, handleNextMonth, currentYear, currentMonth } = useCalendar();

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
                <ListRow
                    left={<Icons.ArrowLeft width={13} onClick={handlePreviousMonth} />}
                    middle={
                        <Text size="xlg" bold>
                            {currentYear}. {currentMonth + 1}
                        </Text>
                    }
                    right={<Icons.ArrowRight width={13} onClick={handleNextMonth} />}
                />

                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weekLabels.ko.map((week, index) => (
                                <th key={index}>{week}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {dateCells.map((cells, index) => (
                            <tr key={index}>
                                {cells.map((cell) => {
                                    const isToday = dayjs(cell.date).isSame(dayjs(), 'day');
                                    const isClicked = dayjs(cell.date).isSame(clickedDate, 'day');

                                    return (
                                        <td
                                            key={cell.value}
                                            onClick={() => handleDate(cell.date)}
                                            className={styles.date}
                                        >
                                            <button
                                                className={`${styles.dateCell} ${
                                                    cell.monthLabel !== 'current' && styles.notCurrent
                                                } 
                                               
                                               `}
                                            >
                                                <Text bold size="sm">
                                                    {cell.date.getDate()}
                                                </Text>

                                                {isClicked && <div className={styles.bubble}>선택</div>}
                                            </button>

                                            {isToday && cell.monthLabel === 'current' && (
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
