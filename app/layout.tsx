import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <body>
                <div className="rootLayout">
                    <main className="main">{children}</main>
                    <div id="modal-root"></div>
                    <div className="footer">
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
