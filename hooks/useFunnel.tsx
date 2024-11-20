'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type UseFunnelOptions<T extends readonly string[]> = {
    initialStep?: T[number]; // steps 배열의 요소 중 하나
    stepQueryKey?: string;
    onStepChange?: (step: T[number]) => void; // steps 배열의 요소 중 하나
};

export const useFunnel = <T extends readonly string[]>(steps: T, options: UseFunnelOptions<T> = {}) => {
    const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentStep, setCurrentStep] = useState<string>(initialStep || steps[0]);

    useEffect(() => {
        const getQueryStep = () => {
            // window가 정의되어 있는지 확인
            if (typeof window !== 'undefined') {
                return new URLSearchParams(window.location.search).get(stepQueryKey);
            }
            return null;
        };

        const queryStep = getQueryStep();

        if (queryStep && queryStep !== currentStep) {
            setCurrentStep(queryStep); // URL에서 가져온 값으로 currentStep 업데이트
            if (onStepChange) {
                onStepChange(queryStep);
            }
        }
    }, [searchParams, currentStep, steps, stepQueryKey, onStepChange]);

    const setStep = (step: T[number]) => {
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

    const FunnelStep = ({ name, children }: { name: T[number]; children: React.ReactNode }) => {
        return currentStep === name ? <div>{children}</div> : null;
    };

    FunnelStep.displayName = 'Funnel.Step';
    Funnel.Step = FunnelStep;

    Funnel.displayName = 'Funnel';

    return [Funnel, setStep] as const;
};
