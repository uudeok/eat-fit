import { ServingTimeType } from '@/components/modal/MealTimeSheet';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/* timeSheet 에서 시간을 입력하면 24시간 형식으로 변환  */
export function convertToServingTime(time: ServingTimeType) {
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

/* UTC 형식의 Date 에서 시간을 KST 로 변환 */
export function convertToKST(time: Date | null) {
    if (!time) return;

    const kstTime = dayjs.utc(time).tz('Asia/Seoul');

    let hour = Number(kstTime.format('HH'));
    const minutes = kstTime.format('mm').padStart(2, '0');
    let period: string;

    // 오전/오후 구분
    if (hour >= 12) {
        period = '오후';
        if (hour > 12) {
            hour = hour - 12; // 12시간 형식으로 변환
        }
    } else {
        period = '오전';
        if (hour === 0) {
            hour = 12; // 0시는 12시로 변경
        }
    }

    return { period, hour, minutes };
}
