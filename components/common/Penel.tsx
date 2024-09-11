import styles from '@styles/common/penel.module.css';
import { CSSProperties, ReactNode, HTMLProps } from 'react';

type PenelType = HTMLProps<HTMLDivElement> & {
    children: ReactNode;
    direction?: 'row' | 'column';
    padding?: CSSProperties['padding'];
    backgroundColor?: CSSProperties['backgroundColor'];
};
const Penel = (props: PenelType) => {
    const { children, direction = 'row', padding, backgroundColor, ...rest } = props;

    return (
        <div className={styles.layout} style={{ flexDirection: direction, padding, backgroundColor }} {...rest}>
            {children}
        </div>
    );
};

export default Penel;
