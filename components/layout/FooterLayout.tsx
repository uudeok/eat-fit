import { ReactNode } from 'react';
import Footer from './Footer';

const FooterLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="rootLayout">
            <main className="main">{children}</main>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};

export default FooterLayout;
