'use client';

import styles from '../../styles/layout/footer.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Icons from '@/assets';
import { PATHS } from '@/constants';

const FOOTER_MENU = [
    { label: 'Home', icon: <Icons.Home width={20} />, path: PATHS.HOME, selected: <Icons.FillHome width={20} /> },
    { label: '카테고리', icon: <Icons.Bar width={20} />, path: PATHS.CATEGORY, selected: <Icons.FillBar width={20} /> },
    {
        label: '마이페이지',
        icon: <Icons.Smile width={20} />,
        path: PATHS.MYPAGE,
        selected: <Icons.FillSmile width={20} />,
    },
];

const Footer = () => {
    const router = useRouter();
    const [selectedPath, setSelectedPath] = useState('/');

    const handleRouter = (path: string) => {
        setSelectedPath(path);
        router.push(path);
    };

    return (
        <div className={styles.layout}>
            <ul className={styles.footer}>
                {FOOTER_MENU.map((menu) => (
                    <li key={menu.label} className={styles.menu} onClick={() => handleRouter(menu.path)}>
                        {selectedPath === menu.path ? menu.selected : menu.icon}
                        {menu.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Footer;
