import { create } from 'zustand';
import { resetHoursDate } from '../utils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

interface CalendarState {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    getFormattedDate: () => string;
}

export const useSelectedDateStore = create<CalendarState>((set, get) => ({
    selectedDate: resetHoursDate(),
    setSelectedDate: (date) => set({ selectedDate: date }),
    getFormattedDate: () => dayjs(get().selectedDate).format(DATE_FORMAT['YYYY-MM-DD']),
}));
