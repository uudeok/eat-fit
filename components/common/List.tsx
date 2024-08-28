import styles from '../../styles/common/list.module.css';
import { ReactNode } from 'react';

type ListRowProps = {
    left: ReactNode;
    right: ReactNode;
    middle?: ReactNode;
};

type ListColProps = {
    top: ReactNode;
    bottom: ReactNode;
    middle?: ReactNode;
};

const List = ({ children }: { children: ReactNode }) => {
    return <ul className={styles.list}>{children}</ul>;
};

export const ListRow = ({ left, right, middle }: ListRowProps) => {
    return (
        <li className={styles.item}>
            {left}
            {middle}
            {right}
        </li>
    );
};

export const ListCol = ({ top, middle, bottom }: ListColProps) => {
    return (
        <li>
            {top}
            {middle}
            {bottom}
        </li>
    );
};

export default List;
