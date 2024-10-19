import { valueOf } from '@/@types';

export const CAL_CHART_LABEL = {
    daily: '일간',
    weekly: '주간',
} as const;

export type CalChartKeys = keyof typeof CAL_CHART_LABEL;
export type CalChartValues = valueOf<typeof CAL_CHART_LABEL>;
