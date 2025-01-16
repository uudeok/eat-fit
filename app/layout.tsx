import './globals.css';
import Toast from '@/components/common/Toast';
import { OverlayContainer } from '@/components/common/Modal';
import DynamicLayout from '@/components/layout/DynamicLayout';
import AuthProvider from '@/shared/context/AuthProvider';
import QueryProvider from '@/shared/context/QueryProvider';
import { getMetadata } from '@/shared/utils/metadata';
import FunnelProvider from '@/shared/context/FunnelProvider';

export const generateMetadata = () => {
    return getMetadata();
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/images/diet.png" />
            </head>
            <body>
                <QueryProvider>
                    <AuthProvider>
                        <FunnelProvider>
                            <DynamicLayout>{children}</DynamicLayout>
                        </FunnelProvider>
                    </AuthProvider>
                    <OverlayContainer />
                    <Toast />
                </QueryProvider>
            </body>
        </html>
    );
}
