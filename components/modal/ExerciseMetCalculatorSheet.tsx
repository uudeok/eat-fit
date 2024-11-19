'use client';

import styles from '@styles/modal/exerciseMetCalculatorSheet.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { BottomSheet } from '../common/Modal';
import { useExercisesStore } from '@/shared/store/useExercisesStore';
import SheetHeader from '../layout/SheetHeader';
import { Input, Textarea } from '../common/Form';
import { useForm } from 'react-hook-form';
import { exerciseFormValidation } from '@/shared/utils/validation';
import { Badge, ListCol, Text } from '../common';
import { EXERCISE_INTENSITY_LABELS, ExerciseIntensityKeysType } from '@/constants';
import { useEffect, useState } from 'react';
import { Nullable } from '@/@types';
import { Button } from '../common/Button';
import { DecodeExercisesItemType } from '@/service/mappers/exercisesMapper';
import { useFetchGoalsByStatus } from '@/service/queries';
import { calculateCaloriesBurned } from '@/shared/utils';

const ExerciseMetCalculatorSheet = () => {
    const { isOpen, onClose } = useModal(ModalType.exerciseMetCalculator);
    const { exerciseMet, addExercise } = useExercisesStore();
    const { data: goalData } = useFetchGoalsByStatus('progress');

    const [selectedIntensity, setSelectedIntensity] = useState<Nullable<ExerciseIntensityKeysType>>(null);

    const { register, handleSubmit, setValue, watch } = useForm<DecodeExercisesItemType>({
        defaultValues: {
            id: exerciseMet?.id,
            exerciseName: exerciseMet?.exerciseName,
            durationMin: 0,
            caloriesBurned: 0,
            exerciseIntensity: 'moderate',
            content: '',
        },
    });

    const durationMin = watch('durationMin');
    const exerciseIntensity = watch('exerciseIntensity');

    useEffect(() => {
        if (exerciseMet && durationMin && exerciseIntensity && goalData) {
            const calcualtorData = {
                met: exerciseMet.met,
                weight: goalData.weight,
                duration: durationMin,
                intensity: exerciseIntensity,
            };
            const burnedCalories = calculateCaloriesBurned(calcualtorData);
            setValue('caloriesBurned', burnedCalories);
        }
    }, [goalData, durationMin, selectedIntensity, exerciseMet]);

    if (!exerciseMet) return;

    const handleIntensity = (key: ExerciseIntensityKeysType) => {
        setValue('exerciseIntensity', key);
        setSelectedIntensity(key);
    };

    const createExerciseData = (data: DecodeExercisesItemType) => {
        addExercise(data);
        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content={exerciseMet?.exerciseName} onClose={onClose} />

            <form onSubmit={handleSubmit(createExerciseData)} className={styles.layout}>
                <ListCol
                    top={
                        <Text bold size="lg">
                            운동 시간
                        </Text>
                    }
                    bottom={
                        <Input
                            type="number"
                            register={register}
                            name="durationMin"
                            rules={{ required: true }}
                            placeholder="0"
                            unit="분"
                            onInput={exerciseFormValidation}
                        />
                    }
                />
                <ListCol
                    top={
                        <Text bold size="lg">
                            운동 강도 (필수)
                        </Text>
                    }
                    bottom={
                        <div className={styles.badgeContainer}>
                            {Object.entries(EXERCISE_INTENSITY_LABELS).map(([key, label]) => (
                                <Badge
                                    key={key}
                                    onClick={() => handleIntensity(key as ExerciseIntensityKeysType)}
                                    isSelected={selectedIntensity === key}
                                >
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    }
                />

                <ListCol
                    top={
                        <Text bold size="lg">
                            소모 칼로리
                        </Text>
                    }
                    bottom={
                        <Input
                            type="number"
                            register={register}
                            name="caloriesBurned"
                            placeholder="0"
                            onInput={exerciseFormValidation}
                            unit="kcal"
                        />
                    }
                />

                <Textarea name="content" register={register} placeholder="예시) 자유형 25m 10세트 (선택)" />

                <Button role="confirm" disabled={!selectedIntensity || !durationMin}>
                    추가하기
                </Button>
            </form>
        </BottomSheet>
    );
};

export default ExerciseMetCalculatorSheet;
