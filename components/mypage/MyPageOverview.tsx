'use client';

import styles from '@styles/component/mypageOverview.module.css';
import Icons from '@/assets';
import { Text } from '../common';
import { useRouter } from 'next/navigation';

const MyPageOverview = () => {
    const router = useRouter();

    const OVERVIEW = [
        { label: '리포트', icon: <Icons.FillReports width={13} />, path: '/mypage/reports' },
        { label: '다이어리', path: '/mypage/diary' },
        { label: 'Lv. 1', path: '/mypage' },
    ];

    return (
        <div className={styles.layout}>
            {OVERVIEW.map((view, idx) => (
                <div key={idx} className={styles.item} onClick={() => router.push(view.path)}>
                    <Text bold color="var(--grey700)">
                        {view.icon} {view.label}
                    </Text>
                </div>
            ))}
        </div>
    );
};

export default MyPageOverview;
