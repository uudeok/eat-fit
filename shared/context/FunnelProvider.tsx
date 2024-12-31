'use client';

import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from 'react';

type FunnelContextType<T = any> = {
    registerData: T;
    setRegisterData: Dispatch<SetStateAction<T>>;
};

export const FunnelContext = createContext<FunnelContextType>({
    registerData: {},
    setRegisterData: () => {},
});

const FunnelProvider = ({ children }: { children: ReactNode }) => {
    const [registerData, setRegisterData] = useState({});

    return <FunnelContext.Provider value={{ registerData, setRegisterData }}>{children}</FunnelContext.Provider>;
};

export default FunnelProvider;

export const useFunnelContext = <T,>(): FunnelContextType<T> => useContext(FunnelContext);
