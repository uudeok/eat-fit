'use client';

import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { DATE_FORMAT, MONTH_LABEL, MONTH_LABEL_VALUES, WEEKS, WeekLabels } from '@/constants';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';

export type DateCell = {
    date: Date;
    value: string;
    monthLabel: MONTH_LABEL_VALUES;
};

const TOTAL_CELLS = 42; // 한 달의 날짜를 표현하는 총 셀 개수

export const useCalendar = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore();
    const [dateCells, setDateCells] = useState<DateCell[][]>([]);
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

    const [weekLabels, setWeekLabels] = useState<WeekLabels>(WEEKS);

    useEffect(() => {
        setCurrentYear(selectedDate.getFullYear());
        setCurrentMonth(selectedDate.getMonth());
    }, [selectedDate]);

    const handlePreviousYear = (): void => {
        const newYear = currentYear - 1;
        setCurrentYear(newYear);
        setSelectedDate(new Date(newYear, currentMonth, selectedDate.getDate()));
    };

    const handleNextYear = (): void => {
        const newYear = currentYear + 1;
        setCurrentYear(newYear);
        setSelectedDate(new Date(newYear, currentMonth, selectedDate.getDate()));
    };

    const handlePreviousDay = useCallback((): void => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
    }, [selectedDate]);

    const handleNextDay = useCallback((): void => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
    }, [selectedDate]);

    const handlePreviousMonth = (): void => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleNextMonth = (): void => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

    const calculateMonthDetails = (year: number, month: number) => {
        const firstDayOfWeek = new Date(year, month).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        return { firstDayOfWeek, lastDateOfMonth };
    };

    const generateCalendar = useCallback(() => {
        const { firstDayOfWeek, lastDateOfMonth } = calculateMonthDetails(currentYear, currentMonth);
        let currentDay: number = new Date(currentYear, currentMonth, 1 - firstDayOfWeek).getDate();

        let dayCount: number = 0;
        let currentMonthLabel: MONTH_LABEL_VALUES = MONTH_LABEL.MONTH_PREV;
        let monthToDisplay: number = currentMonth - 1;

        let calendarCells = [];

        while (dayCount < TOTAL_CELLS) {
            if (dayCount === firstDayOfWeek) {
                currentMonthLabel = MONTH_LABEL.MONTH_CURRENT;
                monthToDisplay++;
                currentDay = 1;
            }

            if (dayCount > firstDayOfWeek && currentDay > lastDateOfMonth) {
                currentMonthLabel = MONTH_LABEL.MONTH_NEXT;
                monthToDisplay++;
                currentDay = 1;
            }

            const formattedDate = dayjs(new Date(currentYear, monthToDisplay, currentDay)).format(
                DATE_FORMAT['YYYY-MM-DD']
            );

            calendarCells.push({
                date: new Date(currentYear, monthToDisplay, currentDay),
                value: formattedDate,
                monthLabel: currentMonthLabel,
            });

            dayCount++;
            currentDay++;
        }

        let rows = [];
        while (calendarCells.length) {
            const week = calendarCells.splice(0, 7);
            rows.push(week);
        }

        setDateCells(rows);
    }, [currentMonth, currentYear]);

    useEffect(() => {
        generateCalendar();
    }, [currentYear, currentMonth, generateCalendar]);

    return {
        handlePreviousDay,
        handleNextDay,
        weekLabels,
        dateCells,
        handlePreviousMonth,
        handleNextMonth,
        currentYear,
        currentMonth,
        handlePreviousYear,
        handleNextYear,
    };
};
