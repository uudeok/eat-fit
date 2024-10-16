'use client';

import styles from '@styles/component/myreports.module.css';
import Icons from '@/assets';
import { Text } from '../common';

const MyReports = () => {
    return (
        <div>
            <div className={styles.header}>
                <Icons.FillReports width={15} />
                <Text bold size="xlg">
                    리포트
                </Text>
            </div>
        </div>
    );
};

export default MyReports;
