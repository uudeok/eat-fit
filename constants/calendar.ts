export const MONTH_LABEL = {
    MONTH_PREV: 'prev',
    MONTH_CURRENT: 'current',
    MONTH_NEXT: 'next',
} as const;

export type MONTH_LABEL_TYPE = typeof MONTH_LABEL;
export type MONTH_LABEL_KEYS = keyof MONTH_LABEL_TYPE;
export type MONTH_LABEL_VALUES = MONTH_LABEL_TYPE[MONTH_LABEL_KEYS];
