'use client';

import styles from '../../styles/layout/mainHeader.module.css';
import Icons from '@/assets';
import Image from 'next/image';
import Text from '../common/Text';
import ModeToggle from '../utils/ModeToggle';
import Alarm from '../utils/Alarm';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modals';

const MainHeader = () => {
    const { onOpen } = useModal(ModalType.mainCalendar);

    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>
                    <ModeToggle />
                    <Alarm />
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.calendar}>
                    <div>
                        <Icons.ArrowLeft width={13} />
                    </div>
                    <div className={styles.dateLabel} onClick={onOpen}>
                        <Image src="/calendar.png" alt="calendar icon" width={20} height={15} />
                        <Text bold>9.2 (월)</Text>
                        <Icons.Down width={10} />
                    </div>
                    <div>
                        <Icons.ArrowRight width={13} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
