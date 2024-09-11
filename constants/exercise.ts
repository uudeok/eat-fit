export const EXERCISE_INTENSITY_LABELS = {
    light: '가볍게',
    moderate: '적당히',
    intense: '격하게',
} as const;

export type IntensityKeysType = keyof typeof EXERCISE_INTENSITY_LABELS;

export type ExercisesType = {
    id: number;
    daily_id: number;
    goal_id: number;
    user_id: string;
    entry_date: string;
    exercise: ExerciseType[];
};

export type ExerciseType = {
    id: number;
    exercise_name: string;
    exercise_intensity: IntensityKeysType;
    duration_minutes: number;
    calories_burned: number;
    content: string | null;
    // photo_url: string | null;
};

export const Exercises: ExercisesType = {
    id: 1,
    daily_id: 1,
    goal_id: 100,
    user_id: 'abc',
    entry_date: '2024-09-05',
    exercise: [
        {
            id: 1,
            exercise_name: '수영(자유형)',
            exercise_intensity: 'moderate',
            duration_minutes: 50,
            calories_burned: 179,
            content: '자유형으로 50m를 10세트',
        },
        {
            id: 2,
            exercise_name: '수영(배영)',
            exercise_intensity: 'light',
            duration_minutes: 15,
            calories_burned: 25,
            content: '배영 50m를 1세트',
        },
        {
            id: 3,
            exercise_name: '수영(평영)',
            exercise_intensity: 'intense',
            duration_minutes: 30,
            calories_burned: 35,
            content: '평영 50m를 5세트',
        },
    ],
};
