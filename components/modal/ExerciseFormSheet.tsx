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
import { useFetchExercises } from '@/service/queries';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useUpdateExercises } from '@/service/mutations';
import { usePathname } from 'next/navigation';
import { DecodeExercisesItemType, encodeUpdateExercise } from '@/service/mappers/exercisesMapper';
import { Nullable } from '@/@types';

/** 해당 바텀시트를 exercises/add or /home 에서 open 한다
 *  1. path 가 add 이면 데이터를 생성 -> createExercisesData
 *  2. path 가 home 이면 기존 데이터를 수정 -> updateExercisesData
 */

const ExerciseFormSheet = () => {
    const pathname = usePathname();
    const path = pathname.split('/').pop();
    const isEditMode = path !== 'add';

    const { isOpen, onClose } = useModal(ModalType.exerciseForm);
    const { addExercise, exerciseItem, updateExercise } = useExercisesStore();

    const [selectedIntensity, setSelectedIntensity] = useState<Nullable<ExerciseIntensityKeysType>>(
        exerciseItem?.exerciseIntensity || null
    );
    const { getFormattedDate } = useSelectedDateStore();
    const formattedDate = getFormattedDate();

    const { data: exercisesData } = useFetchExercises(formattedDate);
    const { mutateAsync: updateExercises } = useUpdateExercises(formattedDate);

    const { register, handleSubmit, setValue } = useForm<DecodeExercisesItemType>({
        defaultValues: {
            id: exerciseItem ? exerciseItem.id : Date.now(),
            exerciseName: exerciseItem?.exerciseName,
            durationMin: exerciseItem?.durationMin,
            caloriesBurned: exerciseItem?.caloriesBurned,
            exerciseIntensity: exerciseItem?.exerciseIntensity,
            content: exerciseItem?.content,
        },
    });

    const updateExercisesData = async (data: DecodeExercisesItemType) => {
        if (exercisesData && exerciseItem) {
            const updatedExercises = exercisesData.exercise.map((exer) => {
                if (exer.id === exerciseItem.id) {
                    return {
                        ...exer,
                        ...data,
                    };
                }
                return exer;
            });

            const updateData = encodeUpdateExercise({
                id: exercisesData.id,
                exercise: updatedExercises,
            });

            console.log(1, updateData);

            await updateExercises({
                ...updateData,
            });
        }

        onClose();
    };

    const createExercisesData = (data: DecodeExercisesItemType) => {
        exerciseItem ? updateExercise(data) : addExercise(data);

        onClose();
    };

    const handleIntensity = (key: ExerciseIntensityKeysType) => {
        setValue('exerciseIntensity', key);
        setSelectedIntensity(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form className={styles.layout}>
                <SheetHeader content="운동 직접 입력하기" onClose={onClose} />

                <ListCol
                    top={<Text bold>운동 이름 (필수)</Text>}
                    bottom={
                        <Input
                            register={register}
                            rules={{ required: true }}
                            name="exerciseName"
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
                                name="durationMin"
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
                                name="caloriesBurned"
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
                    {isEditMode ? (
                        <Button role="confirm" size="lg" onClick={handleSubmit(updateExercisesData)}>
                            수정하기
                        </Button>
                    ) : (
                        <Button
                            role="confirm"
                            size="lg"
                            disabled={!selectedIntensity}
                            onClick={handleSubmit(createExercisesData)}
                        >
                            추가하기
                        </Button>
                    )}
                </div>
            </form>
        </BottomSheet>
    );
};

export default ExerciseFormSheet;
