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

const TOTAL_DAYS = 42;

export const useCalendar = () => {
    const { selectedDate, setSelectedDate } = useSelectedDateStore();
    const [dateCells, setDateCells] = useState<DateCell[][]>([]);
    const [curYear, setCurYear] = useState(selectedDate.getFullYear());
    const [curMonth, setCurMonth] = useState(selectedDate.getMonth());

    const [weeks, setWeeks] = useState<WeekLabels>(WEEKS);

    useEffect(() => {
        setCurYear(selectedDate.getFullYear());
        setCurMonth(selectedDate.getMonth());
    }, [selectedDate]);

    const prevYearController = (): void => {
        const newYear = curYear - 1;
        setCurYear(newYear);
        setSelectedDate(new Date(newYear, curMonth, selectedDate.getDate()));
    };

    const nextYearController = (): void => {
        const newYear = curYear + 1;
        setCurYear(newYear);
        setSelectedDate(new Date(newYear, curMonth, selectedDate.getDate()));
    };

    const prevDateController = useCallback((): void => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
    }, [selectedDate]);

    const nextDateController = useCallback((): void => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
    }, [selectedDate]);

    const prevMonthController = (): void => {
        if (curMonth === 0) {
            setCurMonth(11);
            setCurYear((prevYear) => prevYear - 1);
        } else {
            setCurMonth((prevMonth) => prevMonth - 1);
        }
    };

    const nextMonthController = (): void => {
        if (curMonth === 11) {
            setCurMonth(0);
            setCurYear((prevYear) => prevYear + 1);
        } else {
            setCurMonth((prevMonth) => prevMonth + 1);
        }
    };

    const calculateMonthInfo = (year: number, month: number) => {
        const firstDay = new Date(year, month).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        return { firstDay, lastDate };
    };

    const renderDate = useCallback(() => {
        const { firstDay, lastDate } = calculateMonthInfo(curYear, curMonth);
        let dateCell: number = new Date(curYear, curMonth, 1 - firstDay).getDate();

        let count: number = 0;
        let monthLabel: MONTH_LABEL_VALUES = MONTH_LABEL.MONTH_PREV;
        let month: number = curMonth - 1;

        let cells = [];

        while (count < TOTAL_DAYS) {
            if (count === firstDay) {
                monthLabel = MONTH_LABEL.MONTH_CURRENT;
                month++;
                dateCell = 1;
            }

            if (count > firstDay && dateCell > lastDate) {
                monthLabel = MONTH_LABEL.MONTH_NEXT;
                month++;
                dateCell = 1;
            }

            const formattedDate = dayjs(new Date(curYear, month, dateCell)).format(DATE_FORMAT['YYYY-MM-DD']);

            cells.push({ date: new Date(curYear, month, dateCell), value: formattedDate, monthLabel: monthLabel });

            count++;
            dateCell++;
        }

        let rows = [];
        while (cells.length) {
            const row = cells.splice(0, 7);
            rows.push(row);
        }

        setDateCells(rows);
    }, [curMonth, curYear]);

    useEffect(() => {
        renderDate();
    }, [curYear, curMonth, renderDate]);

    return {
        prevDateController,
        nextDateController,
        weeks,
        dateCells,
        prevMonthController,
        nextMonthController,
        curYear,
        curMonth,
        prevYearController,
        nextYearController,
    };
};

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import dayjs from 'dayjs';
// import { DATE_FORMAT, MONTH_LABEL, MONTH_LABEL_VALUES, WEEKS, WeekLabels } from '@/constants';
// import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';

// export type DateCell = {
//     date: Date;
//     value: string;
//     monthLabel: MONTH_LABEL_VALUES;
// };

// const TOTAL_DAYS = 42;

// export const useCalendar = () => {
//     const { selectedDate, setSelectedDate } = useSelectedDateStore();

//     const [dateCells, setDateCells] = useState<DateCell[][]>([]);
//     const [curYear, setCurYear] = useState(selectedDate.getFullYear());
//     const [curMonth, setCurMonth] = useState(selectedDate.getMonth());

//     const [weeks, setWeeks] = useState<WeekLabels>(WEEKS);

//     useEffect(() => {
//         setCurYear(selectedDate.getFullYear());
//         setCurMonth(selectedDate.getMonth());
//     }, [selectedDate]);

//     const prevYearController = (): void => {
//         const newYear = curYear - 1;
//         setCurYear(newYear);
//         setSelectedDate(new Date(newYear, curMonth, selectedDate.getDate()));
//     };

//     const nextYearController = (): void => {
//         const newYear = curYear + 1;
//         setCurYear(newYear);
//         setSelectedDate(new Date(newYear, curMonth, selectedDate.getDate()));
//     };

//     const prevDateController = useCallback((): void => {
//         setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1));
//     }, [selectedDate]);

//     const nextDateController = useCallback((): void => {
//         setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1));
//     }, [selectedDate]);

//     const prevMonthController = (): void => {
//         if (curMonth === 0) {
//             setCurMonth(11);
//             setCurYear((prevYear) => prevYear - 1);
//         } else {
//             setCurMonth((prevMonth) => prevMonth - 1);
//         }
//     };

//     const nextMonthController = (): void => {
//         if (curMonth === 11) {
//             setCurMonth(0);
//             setCurYear((prevYear) => prevYear + 1);
//         } else {
//             setCurMonth((prevMonth) => prevMonth + 1);
//         }
//     };

//     const calculateMonthInfo = (year: number, month: number) => {
//         const firstDay = new Date(year, month).getDay();
//         const lastDate = new Date(year, month + 1, 0).getDate();
//         return { firstDay, lastDate };
//     };

//     const renderDate = useCallback(() => {
//         const { firstDay, lastDate } = calculateMonthInfo(curYear, curMonth);
//         let dateCell: number = new Date(curYear, curMonth, 1 - firstDay).getDate();

//         let count: number = 0;
//         let monthLabel: MONTH_LABEL_VALUES = MONTH_LABEL.MONTH_PREV;
//         let month: number = curMonth - 1;

//         let cells = [];

//         while (count < TOTAL_DAYS) {
//             if (count === firstDay) {
//                 monthLabel = MONTH_LABEL.MONTH_CURRENT;
//                 month++;
//                 dateCell = 1;
//             }

//             if (count > firstDay && dateCell > lastDate) {
//                 monthLabel = MONTH_LABEL.MONTH_NEXT;
//                 month++;
//                 dateCell = 1;
//             }

//             const formattedDate = dayjs(new Date(curYear, month, dateCell)).format(DATE_FORMAT['YYYY-MM-DD']);

//             cells.push({ date: new Date(curYear, month, dateCell), value: formattedDate, monthLabel: monthLabel });

//             count++;
//             dateCell++;
//         }

//         let rows = [];
//         while (cells.length) {
//             const row = cells.splice(0, 7);
//             rows.push(row);
//         }

//         setDateCells(rows);
//     }, [curMonth, curYear]);

//     useEffect(() => {
//         renderDate();
//     }, [curYear, curMonth, renderDate]);

//     return {
//         prevDateController,
//         nextDateController,
//         weeks,
//         dateCells,
//         prevMonthController,
//         nextMonthController,
//         curYear,
//         curMonth,
//         prevYearController,
//         nextYearController,
//     };
// };
