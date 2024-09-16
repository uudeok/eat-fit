import { ExercisesType } from '@/constants';

export const calculateExerciseTotals = (exercises: ExercisesType) => {
    return exercises.exercise.reduce(
        (totals, item) => {
            totals.calories_burned += item.calories_burned;
            totals.duration_minutes += item.duration_minutes;
            return totals;
        },
        { duration_minutes: 0, calories_burned: 0 }
    );
};
