export const EXERCISE_INTENSITY_LABELS = {
    light: '가볍게',
    moderate: '적당히',
    intense: '격하게',
} as const;

export type ExerciseIntensityKeysType = keyof typeof EXERCISE_INTENSITY_LABELS;
