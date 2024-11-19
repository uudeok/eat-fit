export const EXERCISE_INTENSITY_LABELS = {
    light: '가볍게',
    moderate: '적당히',
    intense: '격하게',
} as const;

export const INTENSITY_LEVEL: Record<ExerciseIntensityKeysType, number> = {
    light: 0.8,
    moderate: 1.0,
    intense: 1.2,
};

export type ExerciseIntensityKeysType = keyof typeof EXERCISE_INTENSITY_LABELS;
