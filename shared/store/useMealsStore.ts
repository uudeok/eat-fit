import { DecodeMealItemType } from '@/service/mappers/mealsMapper';
import { create } from 'zustand';

interface MealsState {
    meals: DecodeMealItemType[];
    mealItem: DecodeMealItemType | null;
    addMeal: (newMeal: DecodeMealItemType) => void;
    removeMeal: (id: number) => void;
    selectMeal: (meal: DecodeMealItemType | null) => void;
    updateMeal: (updatedMeal: DecodeMealItemType) => void;
    resetMeals: () => void;
}

export const useMealsStore = create<MealsState>((set) => ({
    meals: [],
    mealItem: null,

    addMeal: (newMeal) =>
        set((state) => ({
            meals: [...state.meals, newMeal],
        })),
    removeMeal: (id) =>
        set((state) => ({
            meals: state.meals.filter((meal) => meal.id !== id),
        })),
    selectMeal: (meal) =>
        set(() => ({
            mealItem: meal,
        })),
    updateMeal: (updatedMeal) =>
        set((state) => ({
            meals: state.meals.map((meal) => (meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal)),
        })),
    resetMeals: () =>
        set(() => ({
            meals: [],
            mealItem: null,
        })),
}));
