import { Children, HTMLAttributes, ReactElement, ReactNode, cloneElement, useId } from 'react';
import styles from '@styles/common/label.module.css';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    children: ReactElement;
    bottomText?: string;
}

const Label = ({ label, children, bottomText, ...props }: InputProps) => {
    const child = Children.only(children);
    const generatedId = useId();
    const id = child.props.id ?? generatedId;

    return (
        <div className={styles.container} {...props}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            {cloneElement(child, {
                id,
                ...child.props,
            })}
        </div>
    );
};

export default Label;
