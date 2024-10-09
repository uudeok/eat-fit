'use client';

import { ReactNode } from 'react';
import { useModalStore } from '@/shared/store/useModalStore';
import Modal from './Modal';
import {
    TodayMoodSheet,
    TodayWeightSheet,
    CalendarModal,
    MealFormSheet,
    MealTimeSheet,
    ExerciseFormSheet,
    CalorieEditSheet,
    MaintainWeightSheet,
} from '@/components/modal';

type Props = {
    modals: Record<ModalKeysType, ReactNode>;
};

export const ModalType = {
    todayMood: 'todayMood',
    todayWeight: 'todayWeight',
    mainCalendar: 'mainCalendar',
    mealForm: 'mealForm',
    exerciseForm: 'exerciseForm',
    mealTime: 'mealTime',
    calorieEdit: 'calorieEdit',
    maintainWeight: 'maintainWeight',
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
            mealForm: <MealFormSheet />,
            exerciseForm: <ExerciseFormSheet />,
            mealTime: <MealTimeSheet />,
            calorieEdit: <CalorieEditSheet />,
            maintainWeight: <MaintainWeightSheet />,
        }}
    />
);

export default OverlayContainer;
