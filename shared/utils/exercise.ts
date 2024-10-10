import { ExerciseType } from '@/service/@types/res.type';

export type BurnedCaloriesType = {
    duration_min: number;
    calories_burned: number;
};

export const calculateExercisesTotals = (exercises: ExerciseType[]): BurnedCaloriesType => {
    if (exercises.length === 0) {
        return { duration_min: 0, calories_burned: 0 };
    }

    const totals = exercises.reduce(
        (totals, exercise) => {
            return {
                calories_burned: totals.calories_burned + Number(exercise.calories_burned),
                duration_min: totals.duration_min + Number(exercise.duration_min),
            };
        },
        { calories_burned: 0, duration_min: 0 }
    );

    return {
        calories_burned: totals.calories_burned,
        duration_min: totals.duration_min,
    };
};
