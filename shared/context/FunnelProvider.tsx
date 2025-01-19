// 'use client';

// import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from 'react';

// // FunnelContextType 정의
// type FunnelContextType<T> = {
//     registerData: Partial<T>;
//     setRegisterData: Dispatch<SetStateAction<Partial<T>>>;
// };

// export const FunnelContext = createContext<FunnelContextType<any> | null>(null);

// type FunnelProviderProps<T> = {
//     children: ReactNode;
//     initialData?: Partial<T>;
// };

// const FunnelProvider = <T,>({ children, initialData = {} }: FunnelProviderProps<T>) => {
//     const [registerData, setRegisterData] = useState<Partial<T>>(initialData);

//     return <FunnelContext.Provider value={{ registerData, setRegisterData }}>{children}</FunnelContext.Provider>;
// };

// export default FunnelProvider;

// export const useFunnelContext = <T,>(): FunnelContextType<T> => {
//     const context = useContext(FunnelContext);
//     if (!context) {
//         throw new Error('useFunnelContext must be used within a FunnelProvider');
//     }
//     return context as FunnelContextType<T>;
// };

'use client';

import { createContext, ReactNode, useState, useContext, Dispatch, SetStateAction } from 'react';

type FunnelContextType<T = any> = {
    registerData: T;
    setRegisterData: Dispatch<SetStateAction<Partial<T>>>;
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
