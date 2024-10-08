import { create } from 'zustand';
import { resetHoursDate } from '../utils';

interface CalendarState {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export const useSelectedDateStore = create<CalendarState>((set) => ({
    selectedDate: resetHoursDate(),
    setSelectedDate: (date) => set({ selectedDate: date }),
}));
