import { GoalRegisterType } from '@/service/@types';
import { create } from 'zustand';

export type TGoalStore = {
    data: GoalRegisterType;
    setData: (newData: Partial<GoalRegisterType>) => void;
};

export const useGoalSotre = create<TGoalStore>((set) => ({
    data: {} as GoalRegisterType,
    setData: (newData) =>
        set((state) => ({
            data: { ...state.data, ...newData },
        })),
}));
