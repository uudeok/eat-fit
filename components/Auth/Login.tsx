'use client';

import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { OauthButton } from '../common/Button';

const Login = () => {
    const supabase = createClient();

    const handleLogin = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        // if (data.url) {
        //     redirect(data.url);
        // }
    };

    return (
        <div>
            <OauthButton provider="kakao" onClick={() => handleLogin('kakao')} />
            <OauthButton provider="google" onClick={() => handleLogin('google')} />
        </div>
    );
};

export default Login;
