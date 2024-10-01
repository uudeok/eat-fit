import { MealItemType } from '@/service/@types';
import { create } from 'zustand';

type MealItemState = {
    selectedMealItem: MealItemType | null;
    setSelectedMealItem: (item: MealItemType) => void;
    clearSelectedMealItem: () => void;
};

export const useMealItemStore = create<MealItemState>((set) => ({
    selectedMealItem: null,
    setSelectedMealItem: (item) => set({ selectedMealItem: item }),
    clearSelectedMealItem: () => set({ selectedMealItem: null }),
}));
