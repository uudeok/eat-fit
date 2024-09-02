import styles from '../../styles/modal/modal.module.css';
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
    showCloseButton?: boolean;
};

const Modal = ({ children, onClose, showCloseButton }: ModalProps) => {
    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {showCloseButton && (
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                )}

                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
