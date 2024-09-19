import { create } from 'zustand';
import { MealType } from '@/constants/meals';

type MealItemState = {
    selectedMealItem: MealType | null;
    setSelectedMealItem: (item: MealType) => void;
    clearSelectedMealItem: () => void;
};

export const useMealItemStore = create<MealItemState>((set) => ({
    selectedMealItem: null,
    setSelectedMealItem: (item) => set({ selectedMealItem: item }),
    clearSelectedMealItem: () => set({ selectedMealItem: null }),
}));
