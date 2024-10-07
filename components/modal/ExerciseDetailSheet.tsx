import styles from '@styles/modal/exerciseDetailSheet.module.css';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { Badge, ListRow, Penel, Text } from '../common';
import { useExerciseItemStore } from '@/shared/store/useExerciseItemStore';
import { Input, Textarea } from '../common/Form';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { EXERCISE_INTENSITY_LABELS, IntensityKeysType } from '@/constants';
import { useState } from 'react';
import { ModalType } from '../common/Modal/OverlayContainer';

type FormValues = {
    exerciseName: string;
    exerciseTime: string;
    burnedCalories: string;
    exerciseIntensity: IntensityKeysType;
    content: string | null;
};

const ExerciseDetailSheet = () => {
    const { isOpen, onClose } = useModal(ModalType.exerciseDetail);
    const { selectedExerciseItem } = useExerciseItemStore();

    if (!selectedExerciseItem) {
        throw new Error('선택한 운동 데이터가 없습니다');
    }

    const [selectedIntensity, setSelectedIntensity] = useState<IntensityKeysType>(
        selectedExerciseItem?.exercise_intensity
    );

    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            exerciseName: selectedExerciseItem?.exercise_name,
            exerciseTime: selectedExerciseItem?.duration_minutes.toString(),
            burnedCalories: selectedExerciseItem?.calories_burned.toString(),
            exerciseIntensity: selectedExerciseItem?.exercise_intensity,
            content: selectedExerciseItem?.content,
        },
    });

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    const handleIntensity = (key: IntensityKeysType) => {
        setValue('exerciseIntensity', key);
        setSelectedIntensity(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.header}>
                    <Text bold size="xxlg">
                        {selectedExerciseItem?.exercise_name}
                    </Text>
                </div>

                <Penel direction="column">
                    <ListRow
                        left={
                            <Text bold size="lg">
                                운동 시간
                            </Text>
                        }
                        right={
                            <div className={styles.inputContainer}>
                                <Input
                                    register={register}
                                    name="exerciseTime"
                                    placeholder="0"
                                    rules={{ min: 1 }}
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.replace(/\D/g, '');
                                    }}
                                />
                                <Text bold size="lg">
                                    분
                                </Text>
                            </div>
                        }
                    />
                </Penel>

                <Penel direction="column" padding="12px">
                    <ListRow
                        left={
                            <Text bold size="lg">
                                운동 강도
                            </Text>
                        }
                        right={
                            <div className={styles.badgeContainer}>
                                {Object.entries(EXERCISE_INTENSITY_LABELS).map(([key, label]) => (
                                    <div key={key} onClick={() => handleIntensity(key as IntensityKeysType)}>
                                        <Badge isSelected={key === selectedIntensity}>{label}</Badge>
                                    </div>
                                ))}
                            </div>
                        }
                    />
                </Penel>

                <Penel direction="column">
                    <ListRow
                        left={
                            <Text bold size="lg">
                                소모한 칼로리
                            </Text>
                        }
                        right={
                            <div className={styles.inputContainer}>
                                <Input
                                    register={register}
                                    name="burnedCalories"
                                    placeholder="0"
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.replace(/\D/g, '');
                                    }}
                                />
                                <Text bold size="lg">
                                    kcal
                                </Text>
                            </div>
                        }
                    />
                </Penel>

                <Textarea name="content" register={register} placeholder="예시) 자유형 25m 10세트" />

                <div className={styles.buttonContainer}>
                    <Button role="warning" size="lg">
                        삭제
                    </Button>
                    <Button role="confirm" size="lg">
                        수정
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default ExerciseDetailSheet;
