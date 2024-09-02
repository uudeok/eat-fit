'use client';

import useModal from '@/hooks/useModal';
import styles from '../../styles/component/status.module.css';
import Text from '../common/Text';
import Image from 'next/image';

const ModeStatus = () => {
    const { onOpen } = useModal('오늘의기분');

    return (
        <div className={styles.stateItem} onClick={onOpen}>
            <Text color="var(--mainColorDk)" bold size="lg">
                오늘의 기분
            </Text>
            <Image src="/emotion_fill_good.png" width="30" height="30" alt="emotion_good" />
        </div>
    );
};

export default ModeStatus;
