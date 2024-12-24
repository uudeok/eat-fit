'use client';

import styles from '@styles/component/myAuth.module.css';
import { ListRow, Text } from '@/components/common';
import { decodeAuth } from '@/service/mappers/authMapper';
import { AuthContext } from '@/shared/context/AuthProvider';
import { useContext } from 'react';
import Icons from '@/assets';
import { signOut } from '@/shared/utils/supabase';
import { useRouter } from 'next/navigation';

const Auth = () => {
    const router = useRouter();
    const { session } = useContext(AuthContext);

    const accountInfo = session ? decodeAuth(session) : null;

    const logoutHandler = () => {
        signOut();
        router.replace('/');
    };

    return (
        <div className={styles.layout}>
            <div className="space-y-4">
                <ListRow
                    left={<Text bold>가입일</Text>}
                    right={
                        <div className={styles.textContent}>
                            <Text>{accountInfo?.provider}</Text>
                            <Text>({accountInfo?.createdAt})</Text>
                        </div>
                    }
                />
                <ListRow
                    left={<Text bold>로그아웃</Text>}
                    right={
                        <div onClick={logoutHandler}>
                            <Icons.ArrowRight width={10} />
                        </div>
                    }
                />
            </div>
        </div>
    );
};

export default Auth;
