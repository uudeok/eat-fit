import { create } from 'zustand';

type ModalStore = {
    modalType: string | null;
    isOpen: boolean;
    openModal: (type: string) => void;
    closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
    modalType: null,
    isOpen: false,
    openModal: (type) => set({ modalType: type, isOpen: true }),
    closeModal: () => set({ modalType: null, isOpen: false }),
}));

export default useModalStore;
