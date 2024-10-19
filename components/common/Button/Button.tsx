import styles from '@styles/common/button.module.css';
import React, { ButtonHTMLAttributes } from 'react';

export type Role = 'confirm' | 'cancel' | 'warning' | 'none' | 'round';
export type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    role?: Role;
    size?: Size;
    className?: string;
    selected?: boolean;
}

const Button = (props: ButtonProps) => {
    const { size = 'md', role = 'none', children, className, selected, ...rest } = props;

    const roleClass = role ? styles[`role${role}`] : styles[`rolenone`];
    const sizeClass = size ? styles[`size${size}`] : styles[`sizemd`];
    const isSelected = selected ? styles['selected'] : '';

    return (
        <button className={`${styles.buttonBase} ${isSelected} ${roleClass} ${sizeClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
