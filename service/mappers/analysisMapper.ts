import { addDaysAndResetTime, formatCurrentDate } from '@/shared/utils';
import { AnalyzeDataType } from '../@types';

const oneWeeks = 7;

export type DecodeAnalysis = {
    cheering: string;
    evaluates: string;
    tips: string[];
    possibility: string;
    userId: string;
    createdAt: string;
    id: number;
    deadline: string;
};

function addMinutes(date: Date, minutes: number) {
    const result = new Date(date); // 입력된 날짜를 기반으로 새 Date 객체 생성
    result.setMinutes(result.getMinutes() + minutes); // 기존 분에 원하는 분(minutes) 추가
    return result.toString();
}

export const decodeAnalysis = (init: AnalyzeDataType): DecodeAnalysis => ({
    cheering: init.cheering,
    evaluates: init.evaluates,
    tips: init.tips,
    possibility: init.possibility,
    userId: init.user_id,
    id: init.id,
    createdAt: formatCurrentDate(init.created_at),
    // deadline: addMinutes(init.created_at, 2),
    deadline: addDaysAndResetTime(oneWeeks, init.created_at),
});
