import styles from '../../styles/common/button.module.css';
import React, { ButtonHTMLAttributes } from 'react';

export type Role = 'confirm' | 'cancel' | 'warning' | 'none';
export type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    role?: Role;
    size?: Size;
    className?: string;
}

const Button = (props: ButtonProps) => {
    const { size = 'md', role = 'none', children, className, ...rest } = props;

    const roleClass = role ? styles[`role${role}`] : styles[`rolenone`];
    const sizeClass = size ? styles[`size${size}`] : styles[`sizemd`];

    return (
        <button className={`${styles.buttonBase} ${roleClass} ${sizeClass} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
