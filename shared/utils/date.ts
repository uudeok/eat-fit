import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export function resetHoursDate() {
    return dayjs().startOf('day').toDate();
}

export function formatCurrentDate() {
    return dayjs().format(DATE_FORMAT['YYYY-MM-DD']);
}

export function addDaysAndResetTime(addDay: number) {
    return dayjs().add(addDay, 'day').startOf('day').format(DATE_FORMAT['YYYY-MM-DD']);
}

export function convertDateFormat(date: Date, format?: keyof typeof DATE_FORMAT) {
    const selectedFormat = format ? DATE_FORMAT[format] : DATE_FORMAT['YYYY-MM-DD'];
    return dayjs(date).format(selectedFormat);
}

export function calculateDDay(goalEndDate: string) {
    const today = dayjs();
    const endDate = dayjs(goalEndDate);

    const dDay = endDate.diff(today, 'day');

    return dDay;
}

type WeekDaysType = {
    weekDays: number[];
    weekFullDates: string[];
};

export const getWeekDates = (): WeekDaysType => {
    const today = dayjs();
    const startOfWeek = today.startOf('week').add(1, 'day'); // 월요일 기준으로 시작

    const weekDays = [];
    const weekFullDates = [];

    for (let i = 0; i < 7; i++) {
        const currentDay = startOfWeek.add(i, 'day');
        weekDays.push(currentDay.date()); // 일만 추가
        weekFullDates.push(currentDay.format(DATE_FORMAT['YYYY-MM-DD'])); // 전체 날짜 추가
    }

    return { weekDays, weekFullDates };
};

/* 오늘을 기준으로 일주일 이전 날짜를 가져온다 */
export const getPastWeekDates = () => {
    const today = dayjs();
    const pastFullWeekDates = [];
    const pastWeekDates = [];

    for (let i = 6; i >= 0; i--) {
        pastFullWeekDates.push(today.subtract(i, 'day').format(DATE_FORMAT['YYYY-MM-DD']));
        pastWeekDates.push(today.subtract(i, 'day').format(DATE_FORMAT['M.D']));
    }

    return { pastFullWeekDates, pastWeekDates };
};

/* 오늘을 기준으로 7주전 날짜를 주간으로 가져온다 */
export const getPastWeeklyDates = () => {
    const today = dayjs();
    const weeklyDates = [];

    let currentWeekStart = today.startOf('week').add(1, 'day');
    let currentWeekEnd = today.endOf('week').add(1, 'day');

    for (let i = 0; i < 7; i++) {
        weeklyDates.push({
            startDate: {
                formatted: currentWeekStart.format(DATE_FORMAT['YYYY-MM-DD']),
                short: currentWeekStart.format(DATE_FORMAT['M.D']),
            },
            endDate: {
                formatted: currentWeekEnd.format(DATE_FORMAT['YYYY-MM-DD']),
                short: currentWeekEnd.format(DATE_FORMAT['M.D']),
            },
        });
        currentWeekStart = currentWeekStart.subtract(1, 'week');
        currentWeekEnd = currentWeekEnd.subtract(1, 'week');
    }

    return weeklyDates.reverse();
};
