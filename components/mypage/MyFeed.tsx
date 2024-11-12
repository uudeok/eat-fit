'use client';

import styles from '@styles/component/myfeed.module.css';
import Image from 'next/image';
import { Text } from '../common';
import { PlusButton } from '../common/Button';
import { useState } from 'react';
import { confirmAction } from '@/shared/utils';

const MENU_LIST = [
    { label: '😆 일상', key: 'daily' },
    { label: '🍽️ 식단', key: 'meals' },
    { label: '💪 운동', key: 'exercise' },
];

const MyFeed = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFeedMenu = () => {
        confirmAction('아직 준비중이에요');
    };

    return (
        <div className={`${styles.layout} ${isOpen && styles.overlay}`}>
            <div className={styles.main}>
                <Image src="/images/emotion_sad.png" alt="emoji" width={30} height={30} />
                <Text bold size="sm" color="var(--grey700)">
                    등록된 피드가 없어요
                </Text>
            </div>

            {isOpen && (
                <div className={styles.menuList}>
                    {MENU_LIST.map((menu, idx) => (
                        <div key={idx} className={styles.menuItem} onClick={handleFeedMenu}>
                            <Text bold color="var(--grey700)">
                                {menu.label}
                            </Text>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.feedBtn}>
                <PlusButton backgroundColor="var(--mainHover)" onClick={() => setIsOpen((prev) => !prev)} />
            </div>
        </div>
    );
};

export default MyFeed;
