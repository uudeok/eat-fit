export const MONTH_LABEL = {
    MONTH_PREV: 'prev',
    MONTH_CURRENT: 'current',
    MONTH_NEXT: 'next',
} as const;

export type MONTH_LABEL_KEYS = keyof typeof MONTH_LABEL;
export type MONTH_LABEL_VALUES = (typeof MONTH_LABEL)[MONTH_LABEL_KEYS];
