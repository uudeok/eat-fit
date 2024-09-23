import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';

export function resetHoursDate() {
    return dayjs().startOf('day').toDate();
}

export function addDaysAndResetTime(addDay: number) {
    return dayjs().add(addDay, 'day').startOf('day').toDate();
}

export function convertDateFormat(date: Date, format?: keyof typeof DATE_FORMAT) {
    const selectedFormat = format ? DATE_FORMAT[format] : DATE_FORMAT['YYYY-MM-DD'];
    return dayjs(date).format(selectedFormat);
}
