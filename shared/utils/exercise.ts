import { ExercisesType } from '@/constants';

export const calculateExerciseTotals = (exercises: ExercisesType) => {
    const totalDuration = exercises.exercise.reduce((acc, curr) => acc + curr.duration_minutes, 0);
    const totalCalories = exercises.exercise.reduce((acc, curr) => acc + curr.calories_burned, 0);
    return { totalDuration, totalCalories };
};
