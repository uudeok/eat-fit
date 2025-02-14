import { ReactNode } from 'react';

type TCard = {
    header?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
};

const Card = ({ header, children, footer }: TCard) => (
    <div>
        {header && <header>{header}</header>}
        <main>{children}</main>
        {footer && <footer>{footer}</footer>}
    </div>
);

export default Card;
