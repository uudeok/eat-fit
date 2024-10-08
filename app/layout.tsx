import './globals.css';

import type { Metadata } from 'next';
import { OverlayContainer } from '@/components/common/Modal';
import DynamicLayout from '@/components/layout/DynamicLayout';
import AuthProvider from '@/shared/context/AuthProvider';
import QueryProvider from '@/shared/context/QueryProvider';

export const metadata: Metadata = {
    title: 'Eat-Fit',
    description: '맛있게 먹고 건강하게 빼는 습관',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <QueryProvider>
                    <AuthProvider>
                        <DynamicLayout>{children}</DynamicLayout>
                    </AuthProvider>
                    <OverlayContainer />
                </QueryProvider>
            </body>
        </html>
    );
}
