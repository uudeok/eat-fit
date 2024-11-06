'use client';

import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { OauthButton } from '../common/Button';

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
