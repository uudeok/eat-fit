import { create } from 'zustand';

interface ReportState {
    weeklyWeight: number[];
    burnedCalories: number[];
    calories: number[];
    progressionRate: number;

    setWeeklyWeight: (data: number[]) => void;
    setCalories: (data: { calories: number; burnedCalories: number }[]) => void; // 수정된 부분
    setProgressionRate: (data: number) => void;
}

export const useReportStore = create<ReportState>((set) => ({
    weeklyWeight: [],
    burnedCalories: [],
    calories: [],
    progressionRate: 0,

    setWeeklyWeight: (data) => set({ weeklyWeight: data }),
    setCalories: (data) => {
        const calories = data.map((item) => item.calories);
        const burnedCalories = data.map((item) => item.burnedCalories);
        set({ calories, burnedCalories });
    },
    setProgressionRate: (data) => set({ progressionRate: data }),
}));
