import { DecodeExercisesItemType } from '@/service/mappers/exercisesMapper';

export type BurnedCaloriesType = {
    durationMin: number;
    caloriesBurned: number;
};

export const calculateExercisesTotals = (exercises: DecodeExercisesItemType[]): BurnedCaloriesType => {
    if (exercises.length === 0) {
        return { durationMin: 0, caloriesBurned: 0 };
    }

    const totals = exercises.reduce(
        (totals, exercise) => {
            return {
                caloriesBurned: totals.caloriesBurned + Number(exercise.caloriesBurned),
                durationMin: totals.durationMin + Number(exercise.durationMin),
            };
        },
        { caloriesBurned: 0, durationMin: 0 }
    );

    return {
        caloriesBurned: totals.caloriesBurned,
        durationMin: totals.durationMin,
    };
};
