export const COOKIE_KEYS = {
    ANALYSIS: 'ANALYSIS',
} as const;

export const LOCAL_KEYS = {};

export const SESSION_KEYS = {
    GOAL: 'GOAL',
    GOAL_KACL: 'GOAL_KACL',
};

export type CookieKeys = keyof typeof COOKIE_KEYS;
export type LocalKeys = keyof typeof LOCAL_KEYS;
export type SessionKeys = keyof typeof SESSION_KEYS;
