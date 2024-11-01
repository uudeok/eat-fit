const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GPT_BASE_URL = process.env.NEXT_PUBLIC_GPT_URL;

export const API_ENDPOINTS = {
    GOALS: `${BASE_URL}/api/goals`,
    MEALS: '/meals',
    EXERCISES: '/exercises',
    DAILYSPEC: '/dailySpec',
    DAILYSTEP: '/dailySpec/step',
    USERS: `${BASE_URL}/api/users`,
    ANALYSIS: `${BASE_URL}/api/analysis`,
    MAIL: `${BASE_URL}/api/mail`,
    CHAT_GPT: `${GPT_BASE_URL}`,

    MEALS_DETAIL: (mealId: number) => `${BASE_URL}/api/meals/${mealId}`,
} as const;

export default BASE_URL;
