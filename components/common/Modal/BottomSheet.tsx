'use client';

import styles from '@styles/modal/bottomSheet.module.css';
import { ModalProps } from './Modal';

const BottomSheet = ({ children, onClose, isOpen }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default BottomSheet;
