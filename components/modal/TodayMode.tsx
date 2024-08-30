import styles from '../../styles/modal/todaymode.module.css';
import Button from '../common/Button';
import Emotions from '../common/Emotions';
import Text from '../common/Text';

const TodayMode = () => {
    return (
        <div className={styles.layout}>
            <Text size="xxlg" className={styles.title} bold>
                오늘의 기분
            </Text>
            <div className={styles.emotionContainer}>
                <Emotions width={60} height={60} />
            </div>
            <Button role="confirm">완료</Button>
        </div>
    );
};

export default TodayMode;
