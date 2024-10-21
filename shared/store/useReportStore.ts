import { create } from 'zustand';

interface ReportState {
    weeklyWeight: number[];
    burnedCalories: number[];
    calories: number[];
    progressionRage: number;
    setWeeklyWeight: (data: number[]) => void;
    setCalories: (data: { calories: number; burnedCalories: number }[]) => void; // 수정된 부분
    setProgressionRage: (data: number) => void;
}

export const useReportStore = create<ReportState>((set) => ({
    weeklyWeight: [],
    burnedCalories: [],
    calories: [],
    progressionRage: 0,
    setWeeklyWeight: (data) => set({ weeklyWeight: data }),
    setCalories: (data) => {
        const calories = data.map((item) => item.calories);
        const burnedCalories = data.map((item) => item.burnedCalories);
        set({ calories, burnedCalories });
    },
    setProgressionRage: (data) => set({ progressionRage: data }),
}));
