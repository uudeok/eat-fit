import { CreateAnalysisArgs, GoalStatusType } from './@types';

export const goalsKeys = {
    base: [{ scope: 'goals' }] as const,
    all: () => [{ ...goalsKeys.base[0] }] as const,
    status: (status: GoalStatusType) => [{ ...goalsKeys.base[0], entity: 'status', status }] as const,
    detail: (id: number) => [{ ...goalsKeys.base[0], id }] as const,
};

export const dailySpecKeys = {
    base: [{ scope: 'dailyspec' }] as const,
    all: () => [{ ...dailySpecKeys.base[0] }] as const,
    date: (selectedDate: string) => [{ ...dailySpecKeys.base[0], selectedDate }] as const,
    withDetails: (selectedDate: string) => [{ ...dailySpecKeys.base[0], selectedDate, include: 'all' }] as const,
    range: (startDate: string, endDate: string) => [{ ...dailySpecKeys.base[0] }, startDate, endDate] as const,
};

export const mealsKeys = {
    base: [{ scope: 'meals' }] as const,
    all: () => [{ ...mealsKeys.base[0] }] as const,
    date: (selectedDate: string) => [{ ...mealsKeys.base[0], selectedDate }] as const,
    detail: (mealId: number) => [{ ...mealsKeys.base[0], mealId }] as const,
};

export const exercisesKeys = {
    base: [{ scope: 'exercises' }] as const,
    all: () => [{ ...exercisesKeys.base[0] }] as const,
    date: (selectedDate: string) => [{ ...exercisesKeys.base[0], selectedDate }] as const,
};

export const usersKeys = {
    base: [{ scope: 'users' }] as const,
    all: () => [{ ...usersKeys.base[0] }] as const,
};

export const analysisKeys = {
    base: [{ scope: 'analysis' }] as const,
    analysis: ({ goalData, weeklyWeight, burnedCalories, calories, progressionRate }: CreateAnalysisArgs) =>
        [{ ...analysisKeys.base[0], goalData, weeklyWeight, burnedCalories, calories, progressionRate }] as const,
};
