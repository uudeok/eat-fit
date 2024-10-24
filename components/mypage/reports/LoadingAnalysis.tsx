'use client';

import styles from '@styles/modal/loadingAnalysis.module.css';
import Image from 'next/image';
import { Text } from '../../common';
import { useFetchUsers } from '@/service/queries';
import Icons from '@/assets';

const DUMMY_DATA = [
    { content: '목표 몸무게 달성 가능성 계산 중', icon: <Icons.FillCheck width={18} /> },
    { content: '칼로리 계산 중', icon: <Icons.FillCheck width={18} /> },
    { content: '목표 달성을 위한 제안서 작성 중', icon: <Icons.FillCheck width={18} /> },
];

const LoadingAnalysis = () => {
    const { data: userData } = useFetchUsers();

    return (
        <div className={styles.layout}>
            <Image src="/analysis.gif" alt="analyzing" width={140} height={140} />

            <Text bold size="xlg">
                {userData?.nickname}님의 데이터를 분석하고 있어요
            </Text>

            <div className={styles.loadingText}>
                {DUMMY_DATA.map((data, idx) => (
                    <div key={idx} className={styles.textItem}>
                        {data.icon}
                        <Text color="var(--grey800)" size="lg">
                            {data.content}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingAnalysis;
