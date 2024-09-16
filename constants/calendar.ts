export const MONTH_LABEL = {
    MONTH_PREV: 'prev',
    MONTH_CURRENT: 'current',
    MONTH_NEXT: 'next',
} as const;

export type MONTH_LABEL_KEYS = keyof typeof MONTH_LABEL;
export type MONTH_LABEL_VALUES = (typeof MONTH_LABEL)[MONTH_LABEL_KEYS];

export const WEEKS = {
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
} as const;

export type WeekLabels = typeof WEEKS;

export const DATE_FORMAT = {
    'YYYY-MM-DD': 'YYYY-MM-DD',
    'M.D': 'M.D',
    ddd: 'ddd',
} as const;
