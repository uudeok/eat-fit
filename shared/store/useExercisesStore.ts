import { DecodeExercisesItemType } from '@/service/mappers/exercisesMapper';
import { create } from 'zustand';

interface ExercisesState {
    exercises: DecodeExercisesItemType[];
    exerciseItem: DecodeExercisesItemType | null;
    addExercise: (exercise: DecodeExercisesItemType) => void;
    selectExercise: (exercise: DecodeExercisesItemType | null) => void;
    updateExercise: (updatedExercise: DecodeExercisesItemType) => void;
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
