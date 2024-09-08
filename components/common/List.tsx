import styles from '../../styles/common/list.module.css';
import { ReactNode } from 'react';

type ListProps = {
    children: ReactNode;
    className?: string;
};

type ListRowProps = {
    left: ReactNode;
    right: ReactNode;
    middle?: ReactNode;
    className?: string;
};

type ListColProps = {
    top: ReactNode;
    bottom: ReactNode;
    middle?: ReactNode;
};

const List = ({ children, className }: ListProps) => {
    return <ul className={`${className}`}>{children}</ul>;
};

export const ListRow = ({ left, right, middle, className }: ListRowProps) => {
    return (
        <li className={`${styles.row} ${className}`}>
            {left}
            {middle}
            {right}
        </li>
    );
};

export const ListCol = ({ top, middle, bottom }: ListColProps) => {
    return (
        <li className={styles.column}>
            {top}
            {middle}
            {bottom}
        </li>
    );
};

export default List;
