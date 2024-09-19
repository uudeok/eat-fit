import styles from '@styles/component/welcome.module.css';
import { createClient } from '@/shared/utils/supabase/server';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const fetchInitialSession = async (): Promise<Session | null> => {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
};

const WelcomePage = async () => {
    const session = await fetchInitialSession();

    if (session) {
        /// goals data
    } else {
        redirect('/login');
    }

    return (
        <div className={styles.layout}>
            <div className={styles.imageWrapper}>
                <Image src="/eatfit1.png" alt="main img" width={150} height={150} priority />
            </div>
            <div className={styles.textWrapper}>
                <p className={styles.title}>EAT-FIT</p>
            </div>
        </div>
    );
};

export default WelcomePage;

// import Welcome from '@/components/Welcome';
// import { createClient } from '@/shared/utils/supabase/server';
// import { Session } from '@supabase/supabase-js';

// const fetchInitialSession = async (): Promise<Session | null> => {
//     const supabase = createClient();
//     const {
//         data: { session },
//     } = await supabase.auth.getSession();

//     return session;
// };

// const WelcomePage = async () => {
//     const session = await fetchInitialSession();

//     return <Welcome session={session} />;
// };

// export default WelcomePage;
