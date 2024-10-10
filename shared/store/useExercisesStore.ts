import { ExerciseType } from '@/service/@types/res.type';
import { create } from 'zustand';

interface ExercisesState {
    exercises: ExerciseType[];
    exerciseItem: ExerciseType | null;
    addExercise: (exercise: ExerciseType) => void;
    selectExercise: (exercise: ExerciseType | null) => void;
    updateExercise: (updatedExercise: ExerciseType) => void;
    removeExercises: (id: number) => void;
    resetExercises: () => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
    exercises: [],
    exerciseItem: null,

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
}));
