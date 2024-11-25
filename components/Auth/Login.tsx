'use client';

import styles from '@styles/component/login.module.css';
import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { OauthButton } from '../common/Button';
import { ListCol } from '../common';
import { sendErrorMail } from '@/service/api/mailService';
import { useEffect, useState } from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Login = () => {
    const supabase = createClient();
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

    useEffect(() => {
        if (loginProvider) {
            loginRedirector(loginProvider);
        }
    }, [loginProvider]);

    const oauthProviders: Provider[] = ['kakao', 'google'];

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
                        provider={provider}
                        onClick={() => setLoginProvider(provider)}
                        disabled={loginProvider !== null}
                    >
                        {loginProvider === provider ? `${provider} 로그인 중...` : `${provider} 로그인`}
                    </OauthButton>
                ))}
            </div>
        </div>
    );
};

export default Login;

// 'use client';

// import styles from '@styles/component/login.module.css';
// import { createClient } from '@/shared/utils/supabase/client';
// import { Provider } from '@supabase/supabase-js';
// import { OauthButton } from '../common/Button';
// import { ListCol } from '../common';
// import { sendErrorMail } from '@/service/api/mailService';

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// const Login = () => {
//     const supabase = createClient();

//     const handleLogin = async (provider: Provider) => {
//         const { error } = await supabase.auth.signInWithOAuth({
//             provider: provider,
//             options: {
//                 redirectTo: `${baseUrl}/auth/callback`,
//             },
//         });

//         if (error) {
//             await sendErrorMail({
//                 errorLocation: `Oauth Login ${provider}`,
//                 errorMessage: error.message,
//             });

//             throw new Error(error.message);
//         }
//     };

//     return (
//         <div className={styles.layout}>
//             <ListCol
//                 className={styles.title}
//                 top={<div className={styles.name}>EAT-FIT</div>}
//                 bottom={<div className={styles.subtitle}>맞춤 건강 관리 솔루션</div>}
//             />

//             <div className={styles.buttonContainer}>
//                 <OauthButton provider="kakao" onClick={() => handleLogin('kakao')} />
//                 <OauthButton provider="google" onClick={() => handleLogin('google')} />
//             </div>
//         </div>
//     );
// };

// export default Login;
