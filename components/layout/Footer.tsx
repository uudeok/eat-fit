'use client';

import Icons from '@/assets';
import styles from '../../styles/layout/footer.module.css';
import { useRouter } from 'next/navigation';

const FOOTER_MENU = [
    { label: 'Home', icon: <Icons.Home width={20} />, path: '/' },
    { label: '카테고리', icon: <Icons.Bar width={20} />, path: '/category' },
    { label: '마이페이지', icon: <Icons.Smile width={20} />, path: '/mypage' },
];

const Footer = () => {
    const router = useRouter();

    const handleRouter = (path: string) => {
        router.push(path);
    };

    return (
        <div className={styles.layout}>
            <ul className={styles.footer}>
                {FOOTER_MENU.map((menu) => (
                    <li key={menu.label} className={styles.menu} onClick={() => handleRouter(menu.path)}>
                        {menu.icon} {menu.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Footer;
