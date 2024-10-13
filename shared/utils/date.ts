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
