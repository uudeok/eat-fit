'use client';

import { ReactNode } from 'react';
import PrimaryLayout from './PrimaryLayout';
import FooterLayout from './FooterLayout';
import { usePathname } from 'next/navigation';

const layouts = {
    primaryLayout: PrimaryLayout,
    footerLayout: FooterLayout,
} as const;

const layoutConfig = {
    primaryLayout: ['/login', '/goals'], // "/" 도 포함임
    footerLayout: ['/home', '/meals', '/exercise', '/my', '/community'],
} as const;

type LayoutKeysType = keyof typeof layoutConfig;

const getLayoutKey = (pathname: string) => {
    const configEntries = Object.entries(layoutConfig);

    for (const [layoutKey, paths] of configEntries) {
        if (paths.some((path) => pathname.startsWith(path))) {
            return layoutKey;
        }
    }

    return 'primaryLayout';
};

const DynamicLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    const layoutKey = getLayoutKey(pathname) as LayoutKeysType;
    const LayoutComponent = layouts[layoutKey];

    return <LayoutComponent>{children}</LayoutComponent>;
};

export default DynamicLayout;
