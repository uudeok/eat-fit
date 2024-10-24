import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export function resetHoursDate() {
    return dayjs().startOf('day').toDate();
}

export function formatCurrentDate(utcDate?: Date) {
    const formattedDate = utcDate
        ? dayjs(utcDate).format(DATE_FORMAT['YYYY-MM-DD'])
        : dayjs().format(DATE_FORMAT['YYYY-MM-DD']);

    return formattedDate;
}

export function addDaysAndResetTime(addDay: number, utcDate?: Date) {
    const formattedDate = utcDate
        ? dayjs(utcDate).add(addDay, 'day').format(DATE_FORMAT['YYYY-MM-DD'])
        : dayjs().add(addDay, 'day').format(DATE_FORMAT['YYYY-MM-DD']);

    return formattedDate;
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

/* '오늘'을 기준으로 일주일 이전 날짜를 가져온다 */
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

export type PastWeeklyDatesType = {
    startDate: {
        formatted: string;
        short: string;
    };
    endDate: {
        formatted: string;
        short: string;
    };
};

/* '오늘'을 기준으로 매개변수만큼 이전 날짜를 주간 단위로 가져온다 */
export const getPastWeeklyDates = (numberOfWeeks: number): PastWeeklyDatesType[] => {
    const today = dayjs();
    const weeklyDates = [];

    let currentWeekStart = today.startOf('week').add(1, 'day'); // 주의 시작을 월요일로 설정
    let currentWeekEnd = today.endOf('week').add(1, 'day'); // 주의 끝을 일요일로 설정

    for (let i = 0; i < numberOfWeeks; i++) {
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

    return weeklyDates.reverse(); // 최신 날짜부터 반환하려면 배열을 뒤집어 줌
};

// '오늘'을 기준으로 일주일 생성 (몇주)
export const generateWeeklyDates = (numberOfWeeks: number) => {
    const pastWeeklyDates = getPastWeeklyDates(numberOfWeeks);

    return pastWeeklyDates.map(({ startDate }) =>
        Array.from({ length: 7 }, (_, idx) =>
            dayjs(startDate.formatted).add(idx, 'day').format(DATE_FORMAT['YYYY-MM-DD'])
        )
    );
};
