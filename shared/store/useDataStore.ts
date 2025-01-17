import { create } from 'zustand';

export interface FunnelStore<T> {
    data: T;
    setData: (newData: Partial<T>) => void; // Partial로 부분 업데이트 허용
}

export const createStore = <T extends object>(initialData: T) =>
    create<FunnelStore<T>>((set) => ({
        data: initialData,
        setData: (newData) =>
            set((state) => ({
                data: { ...state.data, ...newData },
            })),
    }));
