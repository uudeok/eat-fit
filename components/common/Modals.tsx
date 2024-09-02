'use client';

import useModalStore from '@/shared/store/useModalStore';
import Modal from './Modal';
import TodayModeSheet from '../modal/TodayModeSheet';
import { ReactNode } from 'react';
import TodayWeightSheet from '../modal/TodayWeightSheet';

type Props = {
    modals: { [key: string]: ReactNode };
};

const Switch = ({ modals }: Props) => {
    const { modalType, isOpen, closeModal } = useModalStore();

    if (!modalType || !isOpen) return null;

    const ModalComponent = modals[modalType];

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            {ModalComponent}
        </Modal>
    );
};

export const Modals = () => (
    <Switch
        modals={{
            오늘의기분: <TodayModeSheet />,
            몸무게: <TodayWeightSheet />,
        }}
    />
);
