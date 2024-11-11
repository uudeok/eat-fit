'use client';

import styles from '@styles/component/login.module.css';
import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { OauthButton } from '../common/Button';
import { ListCol } from '../common';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Login = () => {
    const supabase = createClient();

    const handleLogin = async (provider: Provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${baseUrl}/auth/callback`,
            },
        });

        if (error) {
            throw new Error(error.message);
        }
    };

    return (
        <div className={styles.layout}>
            <ListCol
                className={styles.title}
                top={<div className={styles.name}>EAT-FIT</div>}
                bottom={<div className={styles.subtitle}>맞춤 건강 관리 솔루션</div>}
            />

            <div className={styles.buttonContainer}>
                <OauthButton provider="kakao" onClick={() => handleLogin('kakao')} />
                <OauthButton provider="google" onClick={() => handleLogin('google')} />
            </div>
        </div>
    );
};

export default Login;
