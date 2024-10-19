'use client';

import styles from '@styles/component/myreports.module.css';
import CaloriesCharts from './CaloriesChart';
import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import { Text } from '../common';

const MyReports = () => {
    const router = useRouter();

    return (
        <>
            <div className={styles.header}>
                <Icons.ArrowLeft width={17} onClick={() => router.back()} />

                <div className={styles.title}>
                    <Icons.FillReports width={20} />
                    <Text bold size="xlg">
                        리포트
                    </Text>
                </div>
            </div>

            <div className={styles.layout}>
                <CaloriesCharts />
            </div>
        </>
    );
};

export default MyReports;
