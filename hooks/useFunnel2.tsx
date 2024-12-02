'use client';

import { Button } from '@/components/common/Button';
import { getGraph } from '@/components/funnel/getGraph';
import mermaid from 'mermaid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export type StepData<T extends string> = {
    name: T;
    component: React.ComponentType<any>;
    props?: Record<string, any>;
};

type UseFunnelOptions<T extends string> = {
    initialStep?: T;
    stepQueryKey?: string;
    onStepChange?: (step: T) => void;
};

export const useFunnel = <T extends string>(steps: StepData<T>[], options: UseFunnelOptions<T> = {}) => {
    const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentStep, setCurrentStep] = useState<T>(initialStep || steps[0].name);
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const queryStep = searchParams.get(stepQueryKey);

        // 조건을 추가해 불필요한 업데이트 방지
        if (queryStep && queryStep !== currentStep) {
            setCurrentStep(queryStep as T);
            onStepChange?.(queryStep as T);
        }
    }, [searchParams, stepQueryKey]); // currentStep를 의존성에서 제외

    const setStep = (step: T) => {
        if (!steps.some((s) => s.name === step)) {
            console.error(`Invalid step: ${step}`);
            return;
        }

        // 상태 업데이트 전에 중복 방지
        if (currentStep !== step) {
            setCurrentStep(step);
            onStepChange?.(step);

            const newSearchParams = new URLSearchParams(window.location.search);
            newSearchParams.set(stepQueryKey, step);
            router.push(`?${newSearchParams.toString()}`);
        }
    };

    const renderGraph = async () => {
        if (mermaidRef.current) {
            const graphDefinition = getGraph(steps, currentStep);
            // console.log(graphDefinition);
            mermaidRef.current.innerHTML = graphDefinition;

            try {
                const { svg, bindFunctions } = await mermaid.render('mermaid-funnel', graphDefinition);
                mermaidRef.current.innerHTML = svg;
                bindFunctions?.(mermaidRef.current);
            } catch (error) {
                console.error('Mermaid graph rendering failed:', error);
            }
        } else {
            console.warn('Mermaid container is not ready.');
        }

        if (mermaidRef.current) {
            mermaidRef.current.querySelectorAll('g.node').forEach((node) => {
                node.addEventListener('click', (e) => {
                    const target = e.target as HTMLElement;

                    if (target) {
                        const stepName = target.innerText;
                        setStep(stepName as T); // 상태 업데이트
                    }
                });
            });
        }
    };

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'default',
        });
        renderGraph();
    }, [steps]);

    const Funnel = () => {
        const currentStepData = steps.find((s) => s.name === currentStep);
        if (!currentStepData) return null;

        const { component: StepComponent, props = {} } = currentStepData;
        return <StepComponent {...props} />;
    };

    const FunnelGraph = () => {
        const isDevMode = process.env.NODE_ENV === 'development';
        const [isVisible, setIsVisible] = useState(false); // 그래프 표시 상태

        if (!isDevMode) return null;

        const toggleGraphVisibility = () => {
            setIsVisible((prev) => !prev);
        };

        return (
            <div
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
            >
                <div
                    ref={mermaidRef}
                    style={{
                        display: isVisible ? 'block' : 'none',
                        zIndex: 1500,
                    }}
                />
                <Button onClick={toggleGraphVisibility}>{isVisible ? 'closeGraph' : 'openGraph'}</Button>
            </div>
        );
    };
    return [Funnel, setStep, FunnelGraph] as const;
};

// 'use client';

// import { getGraph } from '@/components/funnel/getGraph';
// import mermaid from 'mermaid';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect, useRef } from 'react';

// export type StepData<T extends string> = {
//     name: T;
//     component: React.ComponentType<any>;
//     props?: Record<string, any>;
// };

// type UseFunnelOptions<T extends string> = {
//     initialStep?: T;
//     stepQueryKey?: string;
//     onStepChange?: (step: T) => void;
// };

// export const useFunnel = <T extends string>(steps: StepData<T>[], options: UseFunnelOptions<T> = {}) => {
//     const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     const [currentStep, setCurrentStep] = useState<T>(initialStep || steps[0].name);
//     const mermaidRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const queryStep = searchParams.get(stepQueryKey);

//         // 조건을 추가해 불필요한 업데이트 방지
//         if (queryStep && queryStep !== currentStep) {
//             setCurrentStep(queryStep as T);
//             onStepChange?.(queryStep as T);
//         }
//     }, [searchParams, stepQueryKey]); // currentStep를 의존성에서 제외

//     const setStep = (step: T) => {
//         if (!steps.some((s) => s.name === step)) {
//             console.error(`Invalid step: ${step}`);
//             return;
//         }

//         // 상태 업데이트 전에 중복 방지
//         if (currentStep !== step) {
//             setCurrentStep(step);
//             onStepChange?.(step);

//             const newSearchParams = new URLSearchParams(window.location.search);
//             newSearchParams.set(stepQueryKey, step);
//             router.push(`?${newSearchParams.toString()}`);
//         }
//     };

//     const styles = 'stroke: #FF5722; stroke-width: 3px;';

//     const renderGraph = async () => {
//         if (mermaidRef.current) {
//             const graphDefinition = getGraph(steps, currentStep);
//             console.log(graphDefinition);
//             mermaidRef.current.innerHTML = graphDefinition;

//             try {
//                 const { svg, bindFunctions } = await mermaid.render('mermaid-funnel', graphDefinition);
//                 mermaidRef.current.innerHTML = svg;
//                 bindFunctions?.(mermaidRef.current);
//             } catch (error) {
//                 console.error('Mermaid graph rendering failed:', error);
//             }
//         } else {
//             console.warn('Mermaid container is not ready.');
//         }

//         if (mermaidRef.current) {
//             mermaidRef.current.querySelectorAll('g.node').forEach((node) => {
//                 node.addEventListener('click', (e) => {
//                     const target = e.target as HTMLElement;

//                     if (target) {
//                         const stepName = target.innerText;
//                         setStep(stepName as T); // 상태 업데이트
//                     }
//                 });
//             });
//         }
//     };

//     useEffect(() => {
//         mermaid.initialize({
//             startOnLoad: false,
//             securityLevel: 'loose',
//             theme: 'default',
//         });
//         renderGraph();
//     }, [steps]);

//     const Funnel = () => {
//         const currentStepData = steps.find((s) => s.name === currentStep);
//         if (!currentStepData) return null;

//         const { component: StepComponent, props = {} } = currentStepData;
//         return <StepComponent {...props} />;
//     };

//     return [Funnel, setStep, mermaidRef] as const;
// };
