'use client';

import styles from '@styles/modal/exerciseAddFormSheet.module.css';
import { useModal } from '@/hooks';
import Icons from '@/assets';
import { useForm } from 'react-hook-form';
import { EXERCISE_INTENSITY_LABELS, IntensityKeysType } from '@/constants';
import { useState } from 'react';
import { Input, Textarea } from '../common/Form';
import { Button } from '../common/Button';
import { Badge, Text } from '../common';
import { BottomSheet } from '../common/Modal';

type FormValues = {
    exerciseName: string;
    exerciseTime: string;
    burnedCalories: string;
    exerciseIntensity: IntensityKeysType | null;
    content: string | null;
};

const ExerciseAddFormSheet = () => {
    const [selectedIntensity, setSelectedIntensity] = useState<IntensityKeysType | null>(null);
    const { isOpen, onClose } = useModal('exerciseAddForm');
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            exerciseName: '',
            exerciseTime: '',
            burnedCalories: '',
            exerciseIntensity: null,
            content: null,
        },
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    const handleIntensity = (key: IntensityKeysType) => {
        setValue('exerciseIntensity', key);
        setSelectedIntensity(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <div className={styles.header}>
                    <Text bold size="xlg">
                        운동 직접 입력하기
                    </Text>
                    <Icons.FillXmark width={24} onClick={onClose} />
                </div>

                <Text bold>운동 이름 (필수)</Text>
                <Input
                    register={register}
                    rules={{ required: true }}
                    name="exerciseName"
                    placeholder="운동 이름"
                    className={styles.exerciseName}
                />

                <div className={styles.exerciseGrid}>
                    <div>
                        <Text bold>운동 시간 (필수)</Text>
                        <div className={styles.inputWithUnit}>
                            <Input
                                register={register}
                                rules={{ required: true }}
                                placeholder="0"
                                name="exerciseTime"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                            />
                            <Text bold>분</Text>
                        </div>
                    </div>

                    <div>
                        <Text bold>운동 강도 (필수)</Text>
                        <div className={styles.badgeContainer}>
                            {Object.entries(EXERCISE_INTENSITY_LABELS).map(([key, label]) => (
                                <div key={key} className={styles.badge}>
                                    <Badge
                                        onClick={() => handleIntensity(key as IntensityKeysType)}
                                        isSelected={selectedIntensity === key}
                                    >
                                        {label}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Text bold>소모 칼로리 (선택)</Text>
                        <div className={styles.inputWithUnit}>
                            <Input
                                register={register}
                                name="burnedCalories"
                                placeholder="0"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                            />
                            <Text bold>kcal</Text>
                        </div>
                    </div>
                </div>

                <Textarea name="content" register={register} placeholder="간단한 메모를 남겨보세요 (선택) " />

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg" disabled={!selectedIntensity}>
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default ExerciseAddFormSheet;
