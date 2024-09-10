import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/common/badge.module.css';

interface Props extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    color?: string;
    backgroundColor?: CSSProperties['backgroundColor'];
    isSelected?: boolean;
}

const Badge = (props: Props) => {
    const { children, color, backgroundColor, isSelected, ...rest } = props;

    const selectedStyle = isSelected
        ? { backgroundColor: 'var(--mainColorDk)', color: 'white' }
        : { backgroundColor, color };

    return (
        <span className={styles.badge} style={selectedStyle} {...rest}>
            {children}
        </span>
    );
};

export default Badge;
