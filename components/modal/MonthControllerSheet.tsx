'use client';

import styles from '@styles/modal/monthControllerSheet.module.css';
import { useCalendar, useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { ListRow, Text } from '../common';
import Icons from '@/assets';
import { MONTHS } from '@/constants';
import { Button } from '../common/Button';
import { useState } from 'react';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';

const MonthControllerSheet = () => {
    const { onClose, isOpen } = useModal(ModalType.monthController);

    const { prevYearController, nextYearController, curYear, curMonth } = useCalendar();

    const [selectedMonth, setSelectedMonth] = useState<number>(curMonth + 1);

    const { setSelectedDate } = useSelectedDateStore();

    const redirectDate = () => {
        const newDate = new Date(curYear, selectedMonth - 1);

        setSelectedDate(newDate);

        onClose();
    };

    return (
        <BottomSheet onClose={onClose} isOpen={isOpen}>
            <SheetHeader onClose={onClose} content="월 선택" />

            <div className={styles.monthController}>
                <ListRow
                    left={<Icons.ArrowLeft width={17} onClick={prevYearController} />}
                    middle={
                        <Text bold size="xlg">
                            {curYear}년
                        </Text>
                    }
                    right={<Icons.ArrowRight width={17} onClick={nextYearController} />}
                />
            </div>

            <div className={styles.monthGrid}>
                {MONTHS.map((month, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedMonth(month)}
                        className={`${styles.month} ${selectedMonth === idx + 1 && styles.selectedMonth}`}
                    >
                        {month}월
                    </div>
                ))}
            </div>

            <Button role="round" size="lg" onClick={redirectDate}>
                선택한 달로 이동
            </Button>
        </BottomSheet>
    );
};

export default MonthControllerSheet;
