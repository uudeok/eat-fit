'use client';

import styles from '@styles/component/introScreen.module.css';
import Image from 'next/image';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const LandingScreen = () => {
    const router = useRouter();
    const [isFadeOut, setIsFadeOut] = useState<boolean>(false);

    const { session, isLoading } = useContext(AuthContext);

    const redirectWithDelay = async () => {
        await delay(2000);
        setIsFadeOut(true);
        await delay(500);

        if (session) {
            router.push('/goals');
        } else {
            router.push('/login');
        }
    };

    useEffect(() => {
        if (!isLoading) {
            redirectWithDelay();
        }
    }, [session, isLoading]);

    return (
        <div className={`${styles.layout} ${isFadeOut && styles['fadeOut']}`}>
            <div className={styles.imageWrapper}>
                <Image src="/eatfit3.png" alt="intro image" width={150} height={150} priority />
            </div>
            <div className={styles.textWrapper}>
                <p className={styles.title}>EAT-FIT</p>
            </div>
        </div>
    );
};

export default LandingScreen;
