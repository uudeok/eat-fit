'use client';

import { StepData } from '@/hooks/useFunnel2';

export const getGraph = (steps: StepData<string>[], currentStep: string) => {
    const result: string[] = ['graph TD'];

    result.push('classDef selected fill:#78a8e8,stroke:#78a8e8,font-weight:bold,color:white;');

    steps.forEach((step) => {
        const stepName = step.name;
        const isSelected = stepName === currentStep;

        // 기본 노드 생성
        result.push(`${stepName}[${stepName}]${isSelected ? ':::selected' : ''}`);

        const stepProps = step.props || {};
        Object.entries(stepProps).forEach(([key, value]) => {
            if (typeof value === 'function') {
                // `setStep` 호출을 파싱하여 다음 스텝 연결 생성
                const matches = value.toString().match(/setStep\((?:'|")(.+?)(?:'|")\)/g);

                matches?.forEach((matchedSetStep: any) => {
                    const matchedStepName = matchedSetStep.match(/setStep\((?:'|")(.+?)(?:'|")\)/)?.[1];
                    if (matchedStepName) {
                        const graphNode = `${stepName}[${stepName}] --> |${key}| ${matchedStepName}[${matchedStepName}]`;
                        result.push(graphNode);
                    }
                });
            }
        });

        // props가 없거나 `setStep` 호출이 없는 경우 기본 연결 추가
        const currentIndex = steps.findIndex((s) => s.name === stepName);
        if (currentIndex < steps.length - 1 && !Object.keys(stepProps).some((k) => k === 'onNext')) {
            const nextStepName = steps[currentIndex + 1].name;
            result.push(`${stepName}[${stepName}] --> ${nextStepName}[${nextStepName}]`);
        }
    });

    return result.join('\n');
};
