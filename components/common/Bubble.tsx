import styles from '@styles/common/bubble.module.css';

type BubbleSizeType = 'sm' | 'md' | 'lg';

type Props = {
    content: string;
    position?: 'left' | 'right';
    icon?: React.ReactNode;
    onClick?: () => void;
    size?: BubbleSizeType;
};

const Bubble = (props: Props) => {
    const { content, position = 'right', icon, onClick, size = 'md' } = props;

    const sizeClass = size ? styles[`size${size}`] : styles[`sizemd`];

    return (
        <div className={`${styles.layout} ${styles[position]}`} onClick={onClick}>
            {position === 'left' && <div className={`${styles.circle} ${sizeClass}`}>{icon}</div>}
            <div className={styles.bubble}>{content}</div>
            {position === 'right' && <div className={`${styles.circle} ${sizeClass}`}>{icon}</div>}
        </div>
    );
};

export default Bubble;
