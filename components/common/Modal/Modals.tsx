'use client';

import useModalStore from '@/shared/store/useModalStore';
import Modal from './Modal';
import TodayMoodSheet from '../../modal/TodayMoodSheet';
import { ReactNode } from 'react';
import TodayWeightSheet from '../../modal/TodayWeightSheet';
import CalendarModal from '../../modal/CalendarModal';
import MealDetailSheet from '../../modal/MealDetailSheet';
import MealAddFormSheet from '../../modal/MealAddFormSheet';
import ExerciseAddFormSheet from '../../modal/ExerciseAddFormSheet';

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

const Modals = () => (
    <Switch
        modals={{
            todayMood: <TodayMoodSheet />,
            todayWeight: <TodayWeightSheet />,
            mainCalendar: <CalendarModal />,
            mealDetail: <MealDetailSheet />,
            mealAddForm: <MealAddFormSheet />,
            exerciseAddForm: <ExerciseAddFormSheet />,
        }}
    />
);

export default Modals;
