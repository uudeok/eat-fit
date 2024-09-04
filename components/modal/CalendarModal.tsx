'use client';

import styles from '../../styles/modal/calendarModal.module.css';
import { useModal } from '@/hooks';
import Modal from '../common/Modal';

const CalendarModal = () => {
    const { isOpen, onClose } = useModal('mainCalendar');
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>달력</div>
        </Modal>
    );
};

export default CalendarModal;
