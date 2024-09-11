export type MealsType = {
    id: number;
    daily_id: number;
    user_id: string;
    entry_date: string;
    meal_type: 'meal' | 'snack' | 'night_meal';
    serving_time: string;
    meal: MealType[];
    photo_url: string;
};

export type MealType = {
    id: number;
    food_name: string;
    serving_size: number;
    calories: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    content: string | null;
};

export const Meals: MealsType = {
    id: 1,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'meal',
    serving_time: '13:30',
    photo_url: '/rice.png',
    meal: [
        {
            id: 1,
            food_name: '맥모닝',
            serving_size: 100,
            calories: 180,
            carbohydrate: 3.3,
            protein: 22.3,
            fat: 3,
            content: '맛있는 한끼',
        },
        {
            id: 2,
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

export const Meals2: MealsType = {
    id: 2,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'snack',
    serving_time: '14:20',
    photo_url: '/rice.png',
    meal: [
        {
            id: 1,
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

export const Meals3: MealsType = {
    id: 3,
    daily_id: 1,
    user_id: 'abc',
    entry_date: '2024-09-05',
    meal_type: 'night_meal',
    serving_time: '21:49',
    photo_url: '/rice.png',
    meal: [
        {
            id: 1,
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
