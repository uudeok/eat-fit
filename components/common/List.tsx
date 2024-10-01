import styles from '@styles/common/list.module.css';
import { ReactNode, LiHTMLAttributes } from 'react';

type ListProps = {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
};

type ListRowProps = LiHTMLAttributes<HTMLLIElement> & {
    left: ReactNode;
    right: ReactNode;
    middle?: ReactNode;
    className?: string;
};

type ListColProps = LiHTMLAttributes<HTMLLIElement> & {
    top: ReactNode;
    bottom: ReactNode;
    middle?: ReactNode;
};

const List = ({ children, className, onClick }: ListProps) => {
    return (
        <ul className={`${className}`} onClick={onClick}>
            {children}
        </ul>
    );
};

export const ListRow = ({ left, right, middle, className, ...props }: ListRowProps) => {
    return (
        <li className={`${styles.row} ${className}`} {...props}>
            {left}
            {middle}
            {right}
        </li>
    );
};

export const ListCol = ({ top, middle, bottom, ...props }: ListColProps) => {
    return (
        <li className={styles.column} {...props}>
            {top}
            {middle}
            {bottom}
        </li>
    );
};

export default List;
