'use client';

import useModalStore from '@/shared/store/useModalStore';
import Modal from './Modal';
import TodayMoodSheet from '../modal/TodayMoodSheet';
import { ReactNode } from 'react';
import TodayWeightSheet from '../modal/TodayWeightSheet';
import CalendarModal from '../modal/CalendarModal';

type Props = {
    modals: Record<ModalKeysType, ReactNode>;
};

export const ModalType = {
    todayMood: 'todayMood',
    todayWeight: 'todayWeight',
    mainCalendar: 'mainCalendar',
} as const;

export type ModalKeysType = keyof typeof ModalType;

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
            todayMood: <TodayMoodSheet />,
            todayWeight: <TodayWeightSheet />,
            mainCalendar: <CalendarModal />,
        }}
    />
);
