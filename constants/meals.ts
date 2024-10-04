import { valueOf } from '@/@types';

export const MEALS_TYPE = {
    meal: '식사',
    snack: '간식',
    night_meal: '야식',
} as const;

export type MealsKeysType = keyof typeof MEALS_TYPE;
export type MelasValuesType = valueOf<typeof MEALS_TYPE>;
