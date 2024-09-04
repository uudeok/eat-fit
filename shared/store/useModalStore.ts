import { ModalKeysType } from '@/components/common/Modals';
import { create } from 'zustand';

type ModalStore = {
    modalType: ModalKeysType | null;
    isOpen: boolean;
    openModal: (type: ModalKeysType) => void;
    closeModal: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
    modalType: null,
    isOpen: false,
    openModal: (type: ModalKeysType) => set({ modalType: type, isOpen: true }),
    closeModal: () => set({ modalType: null, isOpen: false }),
}));

export default useModalStore;
