'use client';

import { ReactNode } from 'react';
import { useModalStore } from '@/shared/store/useModalStore';
import Modal from './Modal';
import {
    TodayMoodSheet,
    TodayWeightSheet,
    CalendarModal,
    MealAddFormSheet,
    MealDetailSheet,
    MealTimeSheet,
    ExerciseAddFormSheet,
    ExerciseDetailSheet,
    WelcomeModal,
} from '@/components/modal';

type Props = {
    modals: Record<ModalKeysType, ReactNode>;
};

export const ModalType = {
    todayMood: 'todayMood',
    todayWeight: 'todayWeight',
    mainCalendar: 'mainCalendar',
    mealDetail: 'mealDetail',
    mealAddForm: 'mealAddForm',
    exerciseAddForm: 'exerciseAddForm',
    exerciseDetail: 'exerciseDetail',
    mealTime: 'mealTime',
    welcome: 'welcome',
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

const OverlayContainer = () => (
    <Switch
        modals={{
            todayMood: <TodayMoodSheet />,
            todayWeight: <TodayWeightSheet />,
            mainCalendar: <CalendarModal />,
            mealDetail: <MealDetailSheet />,
            mealAddForm: <MealAddFormSheet />,
            exerciseAddForm: <ExerciseAddFormSheet />,
            exerciseDetail: <ExerciseDetailSheet />,
            mealTime: <MealTimeSheet />,
            welcome: <WelcomeModal />,
        }}
    />
);

export default OverlayContainer;
