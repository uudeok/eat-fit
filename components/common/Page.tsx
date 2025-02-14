import { ReactNode } from 'react';

type TPage = {
    header?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
};

const Page = ({ header, children, footer }: TPage) => {
    return (
        <div>
            <header>{header}</header>
            <main>{children}</main>
            <footer>{footer}</footer>
        </div>
    );
};

export default Page;
