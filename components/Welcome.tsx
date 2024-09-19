'use client';

import styles from '@styles/component/welcome.module.css';
import { Session } from '@supabase/supabase-js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Welcome = ({ session }: { session: Session | null }) => {
    const router = useRouter();

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

export default Welcome;

// 'use client';

// import { fetchGoalsInfo } from '@/api';
// import styles from '@styles/component/welcome.module.css';
// import { Session } from '@supabase/supabase-js';
// import { useQuery } from '@tanstack/react-query';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// const Welcome = ({ session }: { session: Session | null }) => {
//     const router = useRouter();

//     if (!session) {
//         router.push('/login');
//         return;
//     }

//     const { data: goalsData } = useQuery({
//         queryKey: ['goalsData', session.user.id],
//         queryFn: () => fetchGoalsInfo(session?.user.id),
//         enabled: !!session,
//     });

//     if (!goalsData) {
//         console.log('goal data 없음');
//     }

//     return (
//         <div className={styles.layout}>
//             <div className={styles.imageWrapper}>
//                 <Image src="/eatfit1.png" alt="main img" width={150} height={150} priority />
//             </div>
//             <div className={styles.textWrapper}>
//                 <p className={styles.title}>EAT-FIT</p>
//             </div>
//         </div>
//     );
// };

// export default Welcome;
