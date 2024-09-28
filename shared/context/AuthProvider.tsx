'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '../utils/supabase/client';

type AuthContextType = {
    session: Session | null;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
    session: null,
    isLoading: true,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const supabase = createClient();
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const value = { session, isLoading };

    useEffect(() => {
        const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                setSession(null);
            } else if (session) {
                setSession(session);
            }

            setIsLoading(false);
        });

        return () => {
            sub.subscription.unsubscribe();
        };
    }, [supabase.auth]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
