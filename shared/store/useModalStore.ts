import { ModalKeysType } from '@/components/common/Modal/OverlayContainer';
import { create } from 'zustand';

type ModalStore = {
    modalType: ModalKeysType | null;
    isOpen: boolean;
    openModal: (type: ModalKeysType) => void;
    closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
    modalType: null,
    isOpen: false,
    openModal: (type: ModalKeysType) => set({ modalType: type, isOpen: true }),
    closeModal: () => set({ modalType: null, isOpen: false }),
}));
