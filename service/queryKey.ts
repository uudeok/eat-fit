import { GoalStatusType } from './@types';

export const goalsKeys = {
    base: [{ scope: 'goals' }] as const,
    all: () => [{ ...goalsKeys.base[0] }] as const,
    status: (status: GoalStatusType) => [{ ...goalsKeys.base[0], entity: 'status', status }] as const,
    details: (id: number) => [{ ...goalsKeys.base[0], id }] as const,
};

export const dailySpecKeys = {
    base: [{ scope: 'dailyspec' }] as const,
    all: () => [{ ...dailySpecKeys.base[0] }] as const,
    date: (selectedDate: Date) => [{ ...dailySpecKeys.base[0], selectedDate }] as const,
};

export const mealsKeys = {
    base: [{ scope: 'meals' }] as const,
    all: () => [{ ...mealsKeys.base[0] }] as const,
    date: (selectedDate: Date) => [{ ...mealsKeys.base[0], selectedDate }] as const,
};
