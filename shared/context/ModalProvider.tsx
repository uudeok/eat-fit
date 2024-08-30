'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type ModalType = {
    isOpen: boolean;
    content: ReactNode | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
};

export const ModalContext = createContext<ModalType | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = (content: ReactNode) => {
        console.log('oopen');
        setIsOpen(true);
        setContent(content);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) throw new Error('ModalProvider 로 감싸서 사용해야합니다');

    return context;
};
