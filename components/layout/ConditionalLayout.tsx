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
    primaryLayout: ['/login', '/goals'],
    footerLayout: ['/home', '/meals', '/exercise', '/my', '/category'],
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

const ConditionalLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    const layoutKey = getLayoutKey(pathname) as LayoutKeysType;
    const LayoutComponent = layouts[layoutKey];

    return <LayoutComponent>{children}</LayoutComponent>;
};

export default ConditionalLayout;
