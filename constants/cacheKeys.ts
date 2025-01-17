export const COOKIE_KEYS = {
    ANALYSIS: 'ANALYSIS',
} as const;

export const LOCAL_KEYS = {
    LOGIN_PROVIDER: 'LOGIN_PROVIDER',
};

export const SESSION_KEYS = {
    GOAL: 'goal-step',
    GOAL_KACL: 'goal-kcal',
} as const;

export type CookieKeys = keyof typeof COOKIE_KEYS;
export type LocalKeys = keyof typeof LOCAL_KEYS;
export type SessionKeys = keyof typeof SESSION_KEYS;
