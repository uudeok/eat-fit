const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const API_ENDPOINTS = {
    MEALS: `${BASE_URL}/api/meals`,
    MEALS_DETAIL: (mealId: number) => `${BASE_URL}/api/meals/${mealId}`,
} as const;

export default BASE_URL;
