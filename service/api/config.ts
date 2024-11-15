const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GPT_BASE_URL = process.env.NEXT_PUBLIC_GPT_URL;
const FOOD_BASE_URL = process.env.NEXT_PUBLIC_FOOD_API_URL;
const HEALTH_BASE_URL = process.env.NEXT_PUBLIC_HEALTH_API_URL;

export const API_ENDPOINTS = {
    GOALS: '/goals',
    MEALS: '/meals',
    EXERCISES: '/exercises',
    MET: `/exercises/met`,
    HEALTH_API: `${HEALTH_BASE_URL}`,
    DAILYSPEC: '/dailySpec',
    DAILYSTEP: '/dailySpec/step',
    USERS: '/users',
    MAIL: '/mail',
    ANALYSIS: '/analysis',
    CHAT_GPT: `${GPT_BASE_URL}`,
    FOOD_DATA: '/foodData',
    FOOD_API: `${FOOD_BASE_URL}`,
} as const;

export default BASE_URL;
