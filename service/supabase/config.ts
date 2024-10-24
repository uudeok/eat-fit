const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GPT_BASE_URL = process.env.NEXT_PUBLIC_GPT_URL;

export const API_ENDPOINTS = {
    GOALS: `${BASE_URL}/api/goals`,
    MEALS: `${BASE_URL}/api/meals`,
    EXERCISES: `${BASE_URL}/api/exercises`,
    DAILYSPEC: `${BASE_URL}/api/dailySpec`,
    DAILYSTEP: `${BASE_URL}/api/dailySpec/step`,
    USERS: `${BASE_URL}/api/users`,
    ANALYSIS: `${BASE_URL}/api/analysis`,
    CHAT_GPT: `${GPT_BASE_URL}`,
    MEALS_DETAIL: (mealId: number) => `${BASE_URL}/api/meals/${mealId}`,
} as const;

export default BASE_URL;
