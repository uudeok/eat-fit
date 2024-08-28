import './globals.css';
import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

// export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
//     return (
//         <html lang="ko">
//             <body>{children}</body>
//         </html>
//     );
// }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <div className="layout">
                    <main className="main">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
