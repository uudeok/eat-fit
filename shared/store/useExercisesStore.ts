import { ExerciseType } from '@/service/@types/res.type';
import { create } from 'zustand';

interface ExercisesState {
    exercises: ExerciseType[];
    exerciseItem: ExerciseType | null;
    addExercise: (exercise: ExerciseType) => void;
    selectExercise: (exercise: ExerciseType | null) => void;
    updateMeal: (updatedExercise: ExerciseType) => void;
    removeMeal: (id: number) => void;
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
    updateMeal: (updatedExercise) =>
        set((state) => ({
            exercises: state.exercises.map((exercise) =>
                exercise.id === updatedExercise.id ? { ...exercise, ...updatedExercise } : exercise
            ),
        })),
    removeMeal: (id) =>
        set((state) => ({
            exercises: state.exercises.filter((exercise) => exercise.id !== id),
        })),
    resetExercises: () =>
        set(() => ({
            exercises: [],
            exerciseItem: null,
        })),
}));
