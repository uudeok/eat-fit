import FunnelProvider from '@/shared/context/FunnelProvider';
import { ReactNode } from 'react';

const GoalsLayout = ({ children }: { children: ReactNode }) => {
    return <FunnelProvider>{children}</FunnelProvider>;
};

export default GoalsLayout;
