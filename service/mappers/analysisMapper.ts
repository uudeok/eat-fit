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

export const decodeAnalysis = (init: AnalyzeDataType): DecodeAnalysis => ({
    cheering: init.cheering,
    evaluates: init.evaluates,
    tips: init.tips,
    possibility: init.possibility,
    userId: init.user_id,
    id: init.id,
    createdAt: formatCurrentDate(init.created_at),
    deadline: addDaysAndResetTime(oneWeeks, init.created_at),
});
