import { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
};

export default LoginLayout;
