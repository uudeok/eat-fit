import styles from '@styles/common/bubble.module.css';

type Props = {
    content: string;
    position?: 'left' | 'right';
    icon?: React.ReactNode;
    onClick?: () => void;
};

const Bubble = (props: Props) => {
    const { content, position = 'right', icon, onClick } = props;

    return (
        <div className={`${styles.layout} ${styles[position]}`} onClick={onClick}>
            {position === 'left' && <div className={styles.circle}>{icon}</div>}
            <div className={styles.bubble}>{content}</div>
            {position === 'right' && <div className={styles.circle}>{icon}</div>}
        </div>
    );
};

export default Bubble;
