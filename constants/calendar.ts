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
    'KYYYY-MM-DD': 'YYYY년 M월 D일',
    'YY.MM.DD': 'YY.M.D',
    'KYY.MM.DD': 'YY년 MM월 DD일',
} as const;

export const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
