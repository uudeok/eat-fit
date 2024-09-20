'use client';

import styles from '@styles/component/intro.module.css';
import Image from 'next/image';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Intro = () => {
    const router = useRouter();
    const { session, isLoading } = useContext(AuthContext);
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const handleRedirectWithDelay = async () => {
        if (!isLoading) {
            await delay(2000);
            setFadeOut(true);

            await delay(500);

            if (session) {
                router.push('/goals');
            } else {
                router.push('/login');
            }
        }
    };

    useEffect(() => {
        handleRedirectWithDelay();
    }, [session, isLoading, router]);

    return (
        <div className={`${styles.layout} ${fadeOut && styles['fade-out']}`}>
            <div className={styles.imageWrapper}>
                <Image src="/eatfit1.png" alt="intro image" width={150} height={150} priority />
            </div>
            <div className={styles.textWrapper}>
                <p className={styles.title}>EAT-FIT</p>
            </div>
        </div>
    );
};

export default Intro;
