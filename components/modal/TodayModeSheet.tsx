'use client';

import { useModal } from '@/hooks';
import styles from '../../styles/modal/todaymodeSheet.module.css';
import Button from '../common/Button';
import Emotions from '../common/Emotions';
import Text from '../common/Text';
import BottomSheet from '../common/BottomSheet';

const TodayModeSheet = () => {
    const { isOpen, onClose } = useModal('오늘의기분');

    const handleTodayMode = (selectedEmoji: string) => {
        console.log(selectedEmoji);
    };

    const Foo = () => {
        console.log('어떠한 로직');
        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <Text size="xxlg" className={styles.title} bold>
                    오늘의 기분
                </Text>
                <div className={styles.emotionContainer}>
                    <Emotions width={60} height={60} onClick={handleTodayMode} />
                </div>
                <Button role="confirm" onClick={Foo}>
                    완료
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TodayModeSheet;
