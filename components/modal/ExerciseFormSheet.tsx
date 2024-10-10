'use client';

import styles from '@styles/modal/exerciseFormSheet.module.css';
import { useModal } from '@/hooks';
import { useForm } from 'react-hook-form';
import { EXERCISE_INTENSITY_LABELS, ExerciseIntensityKeysType } from '@/constants';
import { useState } from 'react';
import { Input, Textarea } from '../common/Form';
import { Button } from '../common/Button';
import { Badge, ListCol, Text } from '../common';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useExercisesStore } from '@/shared/store/useExercisesStore';

export type ExerciseFormType = {
    id: number;
    exercise_name: string;
    duration_min: number;
    calories_burned: number;
    exercise_intensity: ExerciseIntensityKeysType | null;
    content: string | null;
};

const ExerciseFormSheet = () => {
    const { addExercise, exerciseItem, updateExercise } = useExercisesStore();
    const [selectedIntensity, setSelectedIntensity] = useState<ExerciseIntensityKeysType | null>(
        exerciseItem?.exercise_intensity || null
    );
    const { isOpen, onClose } = useModal(ModalType.exerciseForm);

    const { register, handleSubmit, setValue } = useForm<ExerciseFormType>({
        defaultValues: {
            id: exerciseItem ? exerciseItem.id : Date.now(),
            exercise_name: exerciseItem ? exerciseItem.exercise_name : '',
            duration_min: exerciseItem ? exerciseItem.duration_min : 0,
            calories_burned: exerciseItem ? exerciseItem.calories_burned : 0,
            exercise_intensity: exerciseItem ? exerciseItem.exercise_intensity : null,
            content: exerciseItem ? exerciseItem.content : null,
        },
    });

    const createExercisesData = (data: ExerciseFormType) => {
        if (exerciseItem) {
            updateExercise(data);
        } else {
            addExercise(data);
        }

        onClose();
    };

    const handleIntensity = (key: ExerciseIntensityKeysType) => {
        setValue('exercise_intensity', key);
        setSelectedIntensity(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(createExercisesData)} className={styles.layout}>
                <SheetHeader content="운동 직접 입력하기" onClose={onClose} />

                <ListCol
                    top={<Text bold>운동 이름 (필수)</Text>}
                    bottom={
                        <Input
                            register={register}
                            rules={{ required: true }}
                            name="exercise_name"
                            placeholder="운동 이름"
                        />
                    }
                />

                <div className={styles.exerciseGrid}>
                    <ListCol
                        top={<Text bold>운동 시간 (필수)</Text>}
                        bottom={
                            <Input
                                type="number"
                                register={register}
                                rules={{ required: true }}
                                placeholder="0"
                                name="duration_min"
                                unit="분"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                            />
                        }
                    />

                    <ListCol
                        top={<Text bold>운동 강도 (필수)</Text>}
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
                        top={<Text bold>소모 칼로리 (선택)</Text>}
                        bottom={
                            <Input
                                type="number"
                                register={register}
                                name="calories_burned"
                                placeholder="0"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                                unit="kcal"
                            />
                        }
                    />
                </div>

                <Textarea name="content" register={register} placeholder="예시) 자유형 25m 10세트 (선택)" />

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg" disabled={!selectedIntensity}>
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default ExerciseFormSheet;
