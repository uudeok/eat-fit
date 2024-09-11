import styles from '@styles/common/circleText.module.css';

type Props = {
    color?: string;
    background?: string;
    text: string | number;
    size?: number;
};

const CircleText = ({ text, size = 60, background = '#3498db', color = '#ffffff' }: Props) => {
    return (
        <div
            className={styles.circle}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: background,
                lineHeight: `${size}px`, // 텍스트 수직 정렬
            }}
        >
            <span className={styles.text} style={{ color: color }}>
                {text}
            </span>
        </div>
    );
};

export default CircleText;
