import { ServingTimeType } from '@/components/modal/MealTimeSheet';
import dayjs from 'dayjs';

/* timeSheet 에서 시간을 입력하면 24시간 형식으로 변환  */
export function convertTo24Format(time: ServingTimeType) {
    const { period, hour, minutes } = time;

    if (!period || !hour || !minutes) return { hour: 0, minutes: 0 };

    let newHour = Number(hour);

    if (time.period === '오후' && newHour < 12) {
        newHour += 12;
    }
    if (time.period === '오전' && newHour === 12) {
        newHour = 0;
    }

    return { hour: newHour, minutes: Number(minutes) };
}

/* 서버에서 받아온 servingTime 을 ServingTimeType 으로 변환해준다 */
export function convertToKST(time: Date): ServingTimeType | null {
    if (!time) return null;

    const kstTime = new Date(time);

    let hour = Number(dayjs(kstTime).format('HH').padStart(2, '0'));
    let minutes = Number(dayjs(kstTime).format('mm').padStart(2, '0'));
    let period: string;

    if (hour >= 12) {
        period = '오후';
        if (hour > 12) {
            hour = hour - 12;
        }
    } else {
        period = '오전';
        if (hour === 0) {
            hour = 12;
        }
    }

    return { kstTime, period, hour, minutes };
}

/* ServingTimeType 을 서버에 보낼 Date 형식으로 변환해준다  */
export function convertToServingTime(time: ServingTimeType): Date | null {
    if (!time) return null;

    const { hour, minutes } = convertTo24Format(time);

    const updatedDate = new Date(time.kstTime).getTime();
    const servingTime = new Date(updatedDate).setHours(hour, minutes);

    return new Date(servingTime);
}

export const getNextSundayMidnight = () => {
    const now = new Date();
    const nextSunday = new Date(now);
    nextSunday.setDate(now.getDate() + (7 - now.getDay()));
    nextSunday.setHours(0, 0, 0, 0);
    return nextSunday.getTime();
};
