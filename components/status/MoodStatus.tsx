'use client';

import { useModal } from '@/hooks';
import styles from '../../styles/component/status.module.css';
import Text from '../common/Text';
import Image from 'next/image';
import { ModalType } from '../common/Modals';

const MoodStatus = () => {
    const { onOpen } = useModal(ModalType.todayMood);

    return (
        <div className={styles.stateItem} onClick={onOpen}>
            <Text color="var(--mainColorDk)" bold size="lg">
                오늘의 기분
            </Text>
            <Image src="/emotion_fill_good.png" width="30" height="30" alt="emotion_good" />
        </div>
    );
};

export default MoodStatus;