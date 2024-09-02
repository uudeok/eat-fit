import useModalStore from '@/shared/store/useModalStore';

export const useModal = (type: string) => {
    const { modalType, isOpen, openModal, closeModal } = useModalStore();

    return {
        isOpen: modalType === type && isOpen,
        onOpen: () => openModal(type),
        onClose: closeModal,
    };
};
