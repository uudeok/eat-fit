'use client';

import styles from '@styles/common/funnel.module.css';
import mermaid from 'mermaid';
import { Button } from '@/components/common/Button';
import { getGraph } from '@/components/funnel/getGraph';
import { useState, useEffect, useRef } from 'react';
import { FunnelStateVisualizer } from '@/components/funnel/FunnelStateView';
import { FunnelStateEditor } from '@/components/funnel/FunnelStateEditor';

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

export type FunnelStore<T> = {
    data: T;
    setData: (newData: Partial<T>) => void;
};

export const useFunnel = <T extends string>(steps: StepData<T>[], options: UseFunnelOptions<T> = {}) => {
    const { initialStep, stepQueryKey = 'funnel-step', onStepChange } = options;
    const [currentStep, setCurrentStep] = useState<T>(initialStep || steps[0].name);
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handlePopState = () => {
            const updatedParams = new URLSearchParams(window.location.search);
            const updatedStep = updatedParams.get(stepQueryKey);
            if (updatedStep && updatedStep !== currentStep) {
                setCurrentStep(updatedStep as T);
                onStepChange?.(updatedStep as T);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [currentStep, stepQueryKey, onStepChange]);

    const setStep = (step: T) => {
        if (!steps.some((s) => s.name === step)) {
            console.error(`Invalid step: ${step}`);
            return;
        }

        if (currentStep !== step) {
            setCurrentStep(step);
            onStepChange?.(step);

            const newSearchParams = new URLSearchParams(window.location.search);
            newSearchParams.set(stepQueryKey, step);
            window.history.pushState({ step }, '', `?${newSearchParams.toString()}`);
        }
    };

    const renderGraph = async () => {
        if (mermaidRef.current) {
            const graphDefinition = getGraph(steps, currentStep);

            mermaidRef.current.innerHTML = graphDefinition;

            try {
                const { svg, bindFunctions } = await mermaid.render(`mermaid-funnel-${stepQueryKey}`, graphDefinition);
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

        const { component: StepComponent, props } = currentStepData;

        return <StepComponent {...props} />;
    };

    const FunnelGraph = () => {
        const isDevMode = process.env.NODE_ENV === 'development';

        const [isGraphOpen, setIsGraphOpen] = useState(false);

        if (!isDevMode) return null;

        const toggleGraph = () => setIsGraphOpen((prev) => !prev);

        return (
            <div className={`${styles.graphLayout} ${isGraphOpen ? styles.visible : styles.invisible}`}>
                <div
                    ref={mermaidRef}
                    style={{
                        display: isGraphOpen ? 'block' : 'none',
                        zIndex: 1500,
                    }}
                />
                <Button onClick={toggleGraph}>{isGraphOpen ? 'close' : 'open'}</Button>
            </div>
        );
    };

    const FunnelEditor = <T,>({ data, setData }: FunnelStore<T>) => {
        const isDevMode = process.env.NODE_ENV === 'development';

        const [isEditorOpen, setIsEditorOpen] = useState(false);

        if (!isDevMode) return null;

        const toggleGraph = () => setIsEditorOpen((prev) => !prev);

        return (
            <div className={`${styles.editorLayout} ${isEditorOpen ? styles.visible : styles.invisible}`}>
                <div style={{ display: isEditorOpen ? 'block' : 'none' }}>
                    <FunnelStateVisualizer data={data} setData={setData} />
                    <FunnelStateEditor data={data} setData={setData} />
                </div>
                <Button onClick={toggleGraph}>{isEditorOpen ? 'ed close' : 'ed open'}</Button>
            </div>
        );
    };

    return [Funnel, setStep, FunnelGraph, FunnelEditor] as const;
};
