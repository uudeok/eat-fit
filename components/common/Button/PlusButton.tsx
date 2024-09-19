'use client';

import styles from '@styles/common/plusButton.module.css';
import { CSSProperties, useState } from 'react';
import Icons from '@/assets';

type Props = {
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    backgroundColor?: CSSProperties['backgroundColor'];
    color?: string;
};

const PlusButton = ({ onClick, size = 'md', color, backgroundColor }: Props) => {
    const [isActive, setIsActive] = useState(true);

    const handleClick = () => {
        setIsActive((prev) => !prev);
        onClick && onClick();
    };

    return (
        <button
            className={`${styles.addBtn} ${styles[size]} ${isActive && styles.active}`}
            onClick={handleClick}
            style={{ color, backgroundColor }}
        >
            {isActive ? <Icons.Plus width={15} /> : <Icons.Xmark width={15} />}
        </button>
    );
};

export default PlusButton;
