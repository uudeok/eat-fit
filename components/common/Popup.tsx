'use client';

import { ReactNode } from 'react';
import styles from '../../styles/common/popup.module.css';

type Props = {
    children: ReactNode;
    closeModal: () => void;
};

const Popup = ({ children, closeModal }: Props) => {
    const handleModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={handleModal}>
                {children}
            </div>
        </div>
    );
};

export default Popup;
