import { ExerciseIntensityKeysType } from '@/constants';
import { CreateExercisesArgs, ExercisesType, ExerciseType, UpdateExercisesArgs } from '../@types';

export type DecodeExercisesItemType = {
    id: number;
    exerciseName: string;
    durationMin: number;
    caloriesBurned: number;
    exerciseIntensity: ExerciseIntensityKeysType;
    content: string;
};

export type DecodeExercisesType = {
    id: number;
    dailyId: number;
    userId: string;
    entryDate: string;
    exercise: DecodeExercisesItemType[];
    photoUrls: string[];
};

export const decodeExerciseItem = (init: ExerciseType): DecodeExercisesItemType => ({
    id: init.id,
    exerciseIntensity: init.exercise_intensity,
    exerciseName: init.exercise_name,
    caloriesBurned: init.calories_burned || 0,
    durationMin: init.duration_min || 0,
    content: init.content,
});

export const decodeExercises = (init: ExercisesType): DecodeExercisesType => ({
    id: init.id,
    dailyId: init.daily_id,
    userId: init.user_id,
    entryDate: init.user_id,
    photoUrls: init.photo_url,
    exercise: init.exercise.map(decodeExerciseItem),
});

/******************* encode 작성 *******************/

export const encodeExerciseItem = (init: DecodeExercisesItemType): ExerciseType => ({
    id: init.id,
    calories_burned: init.caloriesBurned,
    content: init.content,
    duration_min: init.durationMin,
    exercise_intensity: init.exerciseIntensity,
    exercise_name: init.exerciseName,
});

export const encodeExercises = (init: DecodeExercisesType): Omit<ExercisesType, 'created_at'> => ({
    id: init.id,
    daily_id: init.dailyId,
    user_id: init.userId,
    photo_url: init.photoUrls,
    entry_date: init.entryDate,
    exercise: init.exercise.map(encodeExerciseItem),
});

export type CreateExercisesType = {
    dailyId: number;
    entryDate: string;
    exercise: DecodeExercisesItemType[];
};

export const encodeCreateExercises = (init: CreateExercisesType): CreateExercisesArgs => ({
    daily_id: init.dailyId,
    entry_date: init.entryDate,
    exercise: init.exercise.map(encodeExerciseItem),
});

export type UpdateExercisesType = {
    id: number;
    exercise: DecodeExercisesItemType[];
    photoUrls?: string[];
};

export const encodeUpdateExercise = (init: UpdateExercisesType): UpdateExercisesArgs => ({
    id: init.id,
    exercise: init.exercise.map(encodeExerciseItem),
    photo_url: init.photoUrls,
});
