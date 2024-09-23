import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

type UseFunnelOptions = {
    initialStep?: string;
    stepQueryKey?: string;
    onStepChange?: (step: string) => void;
};

export const useFunnel = (steps: readonly string[], options: UseFunnelOptions = {}) => {
    const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
    const router = useRouter();
    const searchParams = useSearchParams();

    const getQueryStep = () => new URLSearchParams(window.location.search).get(stepQueryKey);

    const [currentStep, setCurrentStep] = useState<string>(() => {
        const queryStep = getQueryStep();
        return queryStep || initialStep || steps[0];
    });

    // useRef를 사용하여 이전 쿼리 스텝을 저장
    const previousStepRef = useRef<string>(currentStep);

    useEffect(() => {
        const queryStep = getQueryStep();
        if (queryStep && steps.includes(queryStep)) {
            setCurrentStep(queryStep);
            previousStepRef.current = queryStep; // 이전 스텝 업데이트
        }
    }, [searchParams, steps]);

    const setStep = (step: string) => {
        if (!steps.includes(step)) {
            console.error(`Invalid step: ${step}`);
            return;
        }

        // 쿼리 파라미터 업데이트
        const newSearchParams = new URLSearchParams(window.location.search);
        newSearchParams.set(stepQueryKey, step);

        // URL 업데이트
        router.push(`?${newSearchParams.toString()}`);

        // currentStep은 쿼리 파라미터에 의해 업데이트됨
        if (onStepChange) {
            onStepChange(step);
        }
    };

    const Funnel = ({ children }: { children: React.ReactNode }) => {
        return <div>{children}</div>;
    };

    Funnel.Step = ({ name, children }: { name: string; children: React.ReactNode }) => {
        return currentStep === name ? <div>{children}</div> : null;
    };

    return [Funnel, setStep] as const;
};

// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect } from 'react';

// type UseFunnelOptions = {
//     initialStep?: string;
//     stepQueryKey?: string;
//     onStepChange?: (step: string) => void;
// };

// export const useFunnel = (steps: readonly string[], options: UseFunnelOptions = {}) => {
//     const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const getQueryStep = () => new URLSearchParams(window.location.search).get(stepQueryKey);

//     const [currentStep, setCurrentStep] = useState<string>(() => {
//         const queryStep = getQueryStep();
//         return queryStep || initialStep || steps[0];
//     });

//     console.log('currentStep', currentStep);
//     console.log('searchParams', searchParams);
//     console.log('getQueryStep', getQueryStep());

//     useEffect(() => {
//         const queryStep = getQueryStep();
//         if (queryStep && steps.includes(queryStep)) {
//             setCurrentStep(queryStep);
//         }
//     }, [searchParams, steps]);

//     const setStep = (step: string) => {
//         if (!steps.includes(step)) {
//             console.error(`Invalid step: ${step}`);
//             return;
//         }

//         setCurrentStep(step);

//         // 쿼리 파라미터 업데이트
//         const newSearchParams = new URLSearchParams(window.location.search);
//         newSearchParams.set(stepQueryKey, step);

//         // URL 업데이트
//         router.push(`?${newSearchParams.toString()}`);

//         if (onStepChange) {
//             onStepChange(step);
//         }
//     };

//     const Funnel = ({ children }: { children: React.ReactNode }) => {
//         return <div>{children}</div>;
//     };

//     Funnel.Step = ({ name, children }: { name: string; children: React.ReactNode }) => {
//         return currentStep === name ? <div>{children}</div> : null;
//     };

//     return [Funnel, setStep] as const;
// };
