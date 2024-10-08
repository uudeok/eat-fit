'use client';

import styles from '@styles/common/textToggle.module.css';
import React, { useState } from 'react';

type Props = {
    left: string;
    right: string;
    onClick: (value: string) => void;
    initialValue?: string;
};

const TextToggle = ({ left, right, onClick, initialValue }: Props) => {
    const [active, setActive] = useState<string>(initialValue ? initialValue : left);

    const handleClick = (value: string) => {
        setActive(value);
        onClick(value);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.swtich} ${active === left ? styles.leftActive : styles.rightActive}`} />
            <div className={styles.toggleBtn} onClick={() => handleClick(left)}>
                {left}
            </div>
            <div className={styles.toggleBtn} onClick={() => handleClick(right)}>
                {right}
            </div>
        </div>
    );
};

export default TextToggle;
