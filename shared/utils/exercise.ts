import { ExerciseIntensityKeysType, INTENSITY_LEVEL } from '@/constants';
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

type CalculateCaloriesParams = {
    met: number;
    weight: number;
    duration: number;
    intensity: ExerciseIntensityKeysType;
};

export const calculateCaloriesBurned = ({ met, weight, duration, intensity }: CalculateCaloriesParams): number => {
    const durationInHours = duration / 60; // 시간을 시간 단위로 변환
    const intensityLevel = INTENSITY_LEVEL[intensity];

    return Math.round(met * intensityLevel * weight * durationInHours);
};
