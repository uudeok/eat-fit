import { valueOf } from '@/@types';

export const FooterPaths = {
    HOME: 'home',
    CATEGORY: 'category',
    MYPAGE: 'mypage',
} as const;

export type FooterPathType = typeof FooterPaths;
export type FooterPathValues = valueOf<typeof FooterPaths>;
