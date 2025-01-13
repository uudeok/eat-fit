'use client';

import styles from '@styles/component/login.module.css';
import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { OauthButton } from '../common/Button';
import { ListCol } from '../common';
import { sendErrorMail } from '@/service/api/mailApi';
import { useEffect, useState } from 'react';
import { LOCAL_KEYS } from '@/constants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const oauthProviders: Provider[] = ['kakao', 'google'];

const Login = () => {
    const supabase = createClient();
    const [lastLoginProvider, setLastLoginProvider] = useState<Provider | null>(null);
    const [loginProvider, setLoginProvider] = useState<Provider | null>(null);

    const loginRedirector = async (provider: Provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: `${baseUrl}/auth/callback`,
            },
        });

        if (error) {
            await sendErrorMail({
                errorLocation: `Oauth Login ${provider}`,
                errorMessage: error.message,
            });

            throw new Error(error.message);
        }
    };

    const handleLoginClick = (provider: Provider) => {
        // 클라이언트에서만 localStorage 접근
        localStorage.setItem(LOCAL_KEYS.LOGIN_PROVIDER, provider);
        setLoginProvider(provider);
    };

    useEffect(() => {
        // 컴포넌트가 클라이언트에서 마운트 된 후 localStorage에 접근
        const storedProvider = localStorage.getItem(LOCAL_KEYS.LOGIN_PROVIDER);
        if (storedProvider) {
            setLastLoginProvider(storedProvider as Provider);
        }
    }, []);

    useEffect(() => {
        if (loginProvider) {
            loginRedirector(loginProvider);
        }
    }, [loginProvider]);

    return (
        <div className={styles.layout}>
            <ListCol
                className={styles.title}
                top={<div className={styles.name}>EAT-FIT</div>}
                bottom={<div className={styles.subtitle}>맞춤 건강 관리 솔루션</div>}
            />

            <div className={styles.buttonContainer}>
                {oauthProviders.map((provider) => (
                    <OauthButton
                        key={provider}
                        showTooltip={lastLoginProvider === provider && !loginProvider}
                        provider={provider}
                        onClick={() => handleLoginClick(provider)}
                        disabled={loginProvider !== null}
                    >
                        {loginProvider === provider ? (
                            <span className={styles.loadingText}>
                                {provider} 로그인 중<span className={styles.loadingDots}></span>
                            </span>
                        ) : (
                            `${provider} 로그인`
                        )}
                    </OauthButton>
                ))}
            </div>
        </div>
    );
};

export default Login;
