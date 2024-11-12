'use client';

import styles from '@styles/common/plusButton.module.css';
import { ButtonHTMLAttributes, CSSProperties, useEffect, useState } from 'react';
import Icons from '@/assets';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    backgroundColor?: CSSProperties['backgroundColor'];
    color?: string;
    className?: string;
}

const PlusButton = (props: Props) => {
    const { onClick, size = 'md', color, backgroundColor, className } = props;
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
        setIsActive((prev) => !prev);
        onClick && onClick();
    };

    return (
        <button
            className={`${styles.addBtn} ${styles[size]} ${isActive && styles.active} ${className}`}
            onClick={handleClick}
            style={{ color, backgroundColor }}
        >
            {isActive ? <Icons.Plus width={15} /> : <Icons.Xmark width={15} />}
        </button>
    );
};

export default PlusButton;
