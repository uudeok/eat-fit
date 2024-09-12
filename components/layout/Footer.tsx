'use client';

import styles from '@styles/layout/footer.module.css';
import { usePathname, useRouter } from 'next/navigation';
import Icons from '@/assets';
import { FooterPaths } from '@/constants';
import { getFooterPath } from '@/shared/utils';

const FOOTER_MENU = [
    {
        label: 'Home',
        path: FooterPaths.HOME,
        notVisited: <Icons.Home width={20} />,
        visitied: <Icons.FillHome width={20} />,
    },
    {
        label: '카테고리',
        path: FooterPaths.CATEGORY,
        notVisited: <Icons.Bar width={20} />,
        visitied: <Icons.FillBar width={20} />,
    },
    {
        label: '마이페이지',
        path: FooterPaths.MYPAGE,
        notVisited: <Icons.Smile width={20} />,
        visitied: <Icons.FillSmile width={20} />,
    },
];

const Footer = () => {
    const path = usePathname();
    const router = useRouter();

    return (
        <div className={styles.layout}>
            <ul className={styles.footer}>
                {FOOTER_MENU.map((menu) => (
                    <li key={menu.label} className={styles.menu} onClick={() => router.push(getFooterPath(menu.path))}>
                        {path === getFooterPath(menu.path) ? menu.visitied : menu.notVisited}
                        {menu.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Footer;
