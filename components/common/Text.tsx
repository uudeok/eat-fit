import styles from '@styles/common/text.module.css';
import React, { CSSProperties, ReactNode } from 'react';

export type TextProps = {
    size?: 'xsm' | 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg';
    children: ReactNode;
    color?: string;
    textAlign?: CSSProperties['textAlign'];
    as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
    bold?: boolean;
};

const Text = (props: TextProps) => {
    const { size = 'md', color, textAlign, children, as: Component = 'span', className, bold } = props;
    return (
        <Component
            className={`${styles.textBase} ${styles[size]} ${bold ? styles.bold : ''} ${className}`}
            style={{ color, textAlign }}
        >
            {children}
        </Component>
    );
};

export default Text;
