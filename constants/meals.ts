import { valueOf } from '@/@types';
import { MealType } from '@/service/@types/res.type';

export const MEALS_TYPE = {
    meal: '식사',
    snack: '간식',
    night_meal: '야식',
} as const;

export type MealsKeysType = keyof typeof MEALS_TYPE;
export type MelasValuesType = valueOf<typeof MEALS_TYPE>;

export const Meals: MealType = {
    id: 1,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'meal',
    serving_time: null,
    photo_url: ['/rice.png'],
    created_at: '2024-09-04',
    meal: [
        {
            food_name: '맥모닝',
            serving_size: 100,
            calories: 180,
            carbohydrate: 3.3,
            protein: 22.3,
            fat: 3,
            content: '맛있는 한끼',
        },
        {
            food_name: '아메리카노',
            serving_size: 300,
            calories: 5,
            carbohydrate: 0.5,
            protein: 0,
            fat: 0,
            content: '맥모닝과 함께',
        },
    ],
};

export const Meals2: MealType = {
    id: 2,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'snack',
    serving_time: '14:20',
    photo_url: ['/rice.png'],
    created_at: '2024-09-04',
    meal: [
        {
            food_name: '쿠키',
            serving_size: 250,
            calories: 220,
            carbohydrate: 59,
            protein: 18,
            fat: 45,
            content: '당 충전 쿠키',
        },
    ],
};

export const Meals3: MealType = {
    id: 3,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'night_meal',
    serving_time: '21:49',
    photo_url: ['/rice.png'],
    created_at: '2024-09-04',
    meal: [
        {
            food_name: '칼국수',
            serving_size: 300,
            calories: 200,
            carbohydrate: 34,
            protein: 20,
            fat: 15,
            content: '배고파서 유혹을 못 이기고 칼국수 하나 먹음 맛있었음',
        },
    ],
};
