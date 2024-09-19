import styles from '@styles/layout/primary.module.css';
import { ReactNode } from 'react';

const PrimaryLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.main}>{children}</div>
        </div>
    );
};

export default PrimaryLayout;
