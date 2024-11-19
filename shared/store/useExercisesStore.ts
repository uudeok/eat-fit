import { DecodeExercisesItemType } from '@/service/mappers/exercisesMapper';
import { DecodeHealthMetDataType } from '@/service/mappers/healthMetMapper';
import { create } from 'zustand';

interface ExercisesState {
    exercises: DecodeExercisesItemType[];
    exerciseItem: DecodeExercisesItemType | null;
    exerciseMet: DecodeHealthMetDataType | null;
    selectExerciseMet: (exerciseMet: DecodeHealthMetDataType) => void;
    addExercise: (exercise: DecodeExercisesItemType) => void;
    selectExercise: (exercise: DecodeExercisesItemType | null) => void;
    updateExercise: (updatedExercise: DecodeExercisesItemType) => void;
    removeExercises: (id: number) => void;
    resetExercises: () => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
    exercises: [],
    exerciseItem: null,
    exerciseMet: null,

    addExercise: (newExercise) =>
        set((state) => ({
            exercises: [...state.exercises, newExercise],
        })),
    selectExercise: (exercise) =>
        set(() => ({
            exerciseItem: exercise,
        })),
    updateExercise: (updatedExercise) =>
        set((state) => ({
            exercises: state.exercises.map((exercise) =>
                exercise.id === updatedExercise.id ? { ...exercise, ...updatedExercise } : exercise
            ),
        })),
    removeExercises: (id) =>
        set((state) => ({
            exercises: state.exercises.filter((exercise) => exercise.id !== id),
        })),
    resetExercises: () =>
        set(() => ({
            exercises: [],
            exerciseItem: null,
        })),
    selectExerciseMet: (newExerciseMet) =>
        set(() => ({
            exerciseMet: newExerciseMet,
        })),
}));
