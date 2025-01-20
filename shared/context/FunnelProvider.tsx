'use client';

import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from 'react';

type FunnelContextType<T = any> = {
    registerData: T;
    setRegisterData: Dispatch<SetStateAction<Partial<T>>>;
    isDevMode: boolean;
};

export const FunnelContext = createContext<FunnelContextType>({
    registerData: {},
    setRegisterData: () => {},
    isDevMode: false,
});

const FunnelProvider = ({ children }: { children: ReactNode }) => {
    const [registerData, setRegisterData] = useState({});
    const isDevMode = process.env.NODE_ENV === 'development';

    return (
        <FunnelContext.Provider value={{ registerData, setRegisterData, isDevMode }}>{children}</FunnelContext.Provider>
    );
};

export default FunnelProvider;

export const useFunnelContext = <T,>(): FunnelContextType<T> => useContext(FunnelContext);
