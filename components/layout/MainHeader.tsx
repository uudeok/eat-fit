'use client';

import styles from '../../styles/layout/mainHeader.module.css';
import { useState } from 'react';
import Icons from '@/assets';
import Image from 'next/image';
import Text from '../common/Text';
import Modal from '../common/Modal';

const MainHeader = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const modeToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    const modalToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>
                    <div onClick={modeToggle}>
                        {isDarkMode ? <Icons.FillMoon width={20} /> : <Icons.FillSun width={20} />}
                    </div>
                    <div>
                        <Icons.Bell width={20} />
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.calendar}>
                    <div>
                        <Icons.ArrowLeft width={13} />
                    </div>
                    <div className={styles.dateLabel} onClick={modalToggle}>
                        <Image src="/calendar.png" alt="calendar icon" width={20} height={17} />
                        <Text bold>9.2 (월)</Text>
                        <Icons.Down width={10} />
                    </div>
                    <div>
                        <Icons.ArrowRight width={13} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <Modal onClose={modalToggle} showCloseButton={true}>
                    <div style={{ width: '150px', height: '150px' }}>hi</div>
                </Modal>
            )}
        </div>
    );
};

export default MainHeader;
