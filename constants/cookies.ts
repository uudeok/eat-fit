export const COOKIE_NAMES = {
    ANALYSIS: 'ANALYSIS',
} as const;

export type CookieName = keyof typeof COOKIE_NAMES;
