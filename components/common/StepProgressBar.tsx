import React from 'react';

type StepProgressProps = {
    totalSteps: number;
    currentStep: number;
    stepLabels?: string[];
    className?: string;
};

const StepProgress = ({ totalSteps, currentStep, stepLabels = [], className }: StepProgressProps) => {
    return (
        <div className={`step-progress ${className || ''}`} style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: totalSteps }, (_, i) => {
                const stepIndex = i + 1;
                const isCompleted = stepIndex < currentStep;
                const isActive = stepIndex === currentStep;

                const stepClass = `step
          ${isCompleted ? 'step-completed' : ''}
          ${isActive ? 'step-active' : ''}
          ${!isCompleted && !isActive ? 'step-pending' : ''}`;

                return (
                    <div
                        key={stepIndex}
                        className={stepClass}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 8px',
                            position: 'relative',
                        }}
                    >
                        <div
                            className="step-circle"
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: '50%',
                                backgroundColor: isActive ? '#90c2ff' : isCompleted ? '#78a8e8' : '#ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            {stepIndex}
                        </div>

                        {stepLabels[i] && (
                            <span
                                className="step-label"
                                style={{
                                    marginTop: 8,
                                    fontSize: 12,
                                    color: isActive ? '#90c2ff' : isCompleted ? '#78a8e8' : '#aaa',
                                    textAlign: 'center',
                                }}
                            >
                                {stepLabels[i]}
                            </span>
                        )}

                        {stepIndex < totalSteps && (
                            <div
                                className="step-line"
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '100%',
                                    width: '40px',
                                    height: '4px',
                                    backgroundColor: isCompleted ? '#78a8e8' : '#ccc',
                                    transform: 'translateY(-50%)',
                                    zIndex: -1,
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default StepProgress;
