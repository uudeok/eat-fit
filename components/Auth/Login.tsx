'use client';

import { createClient } from '@/shared/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { getBaseUrl } from '@/shared/utils/supabase';
import { OauthButton } from '../common/Button';

const Login = () => {
    const supabase = createClient();

    const handleLogin = async (provider: Provider) => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: 'http://localhost:3000/goals',
            },
        });

        if (error) {
            throw new Error(error.message);
        }
    };

    return (
        <div>
            <OauthButton provider="kakao" onClick={() => handleLogin('kakao')} />
            <OauthButton provider="google" onClick={() => handleLogin('google')} />
        </div>
    );
};

export default Login;
