import { create } from 'zustand';
import { ExerciseType } from '@/constants';

type ExerciseItemState = {
    selectedExerciseItem: ExerciseType | null;
    setSelectedExerciseItem: (item: ExerciseType) => void;
    clearSelectedExerciseItem: () => void;
};

export const useExerciseItemStore = create<ExerciseItemState>((set) => ({
    selectedExerciseItem: null,
    setSelectedExerciseItem: (item) => set({ selectedExerciseItem: item }),
    clearSelectedExerciseItem: () => set({ selectedExerciseItem: null }),
}));
