'use client';

import styles from '../../styles/layout/mainHeader.module.css';
import List, { ListRow } from '../common/List';

const MainHeader = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.top}>
                <div className={styles.theme}>
                    <span>테마</span>
                    <span>알림</span>
                </div>
            </div>

            <div className={styles.bottom}>
                <List>
                    <ListRow left={<div>〈</div>} middle={<div>오늘</div>} right={<div>〉</div>} />
                </List>
            </div>
        </div>
    );
};

export default MainHeader;
