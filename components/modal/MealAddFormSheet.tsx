'use client';

import styles from '@styles/modal/mealAddFormSheet.module.css';
import { useModal } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Text, Badge, ListCol } from '../common';
import { BottomSheet } from '../common/Modal';
import { Input, Textarea } from '../common/Form';
import { MEALS_TYPE, MealsKeysType } from '@/constants/meals';
import { useState } from 'react';
import SheetHeader from '../layout/SheetHeader';

type FormValues = {
    foodName: string;
    meal_type: MealsKeysType | null;
    calories: string;
    carbohydrate: string;
    protein: string;
    fat: string;
    content: string | null;
};

const MealAddFormSheet = () => {
    const [selectedMealType, setSelectedMealType] = useState<MealsKeysType | null>(null);
    const { isOpen, onClose } = useModal('mealAddForm');
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            foodName: '',
            meal_type: null,
            calories: '',
            carbohydrate: '',
            protein: '',
            fat: '',
            content: null,
        },
    });

    const NUTRIENTS: { label: string; name: keyof FormValues; unit: string }[] = [
        { label: '칼로리', name: 'calories', unit: 'kcal' },
        { label: '탄수화물', name: 'carbohydrate', unit: 'g' },
        { label: '단백질', name: 'protein', unit: 'g' },
        { label: '지방', name: 'fat', unit: 'g' },
    ];

    const onSubmit = handleSubmit((data) => console.log(data));

    const handleMealType = (key: MealsKeysType) => {
        setValue('meal_type', key);
        setSelectedMealType(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <SheetHeader content="음식 직접 입력하기" onClose={onClose} />

                <ListCol
                    top={<Text bold>음식 이름 (필수)</Text>}
                    bottom={
                        <Input
                            register={register}
                            rules={{ required: true }}
                            placeholder="음식 이름"
                            name="foodName"
                            className={styles.foodNameInput}
                        />
                    }
                />

                <ListCol
                    top={<Text bold>식사 유형 (필수)</Text>}
                    bottom={
                        <div className={styles.badgeContainer}>
                            {Object.entries(MEALS_TYPE).map(([key, label]) => (
                                <Badge
                                    key={label}
                                    onClick={() => handleMealType(key as MealsKeysType)}
                                    isSelected={selectedMealType === key}
                                >
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    }
                />

                <div className={styles.nutrientGrid}>
                    {NUTRIENTS.map((nutrient, idx) => (
                        <div key={idx}>
                            <ListCol
                                top={<Text bold>{nutrient.label}</Text>}
                                bottom={
                                    <div className={styles.inputWithUnit}>
                                        <Input
                                            register={register}
                                            name={nutrient.name}
                                            placeholder="0"
                                            onInput={(e) => {
                                                const input = e.target as HTMLInputElement;
                                                input.value = input.value.replace(/[^0-9.]/g, '');
                                            }}
                                        />
                                        <Text bold>{nutrient.unit}</Text>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>

                <Textarea register={register} name="content" placeholder="예시) 치팅데이 (선택)" />

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg" disabled={!selectedMealType}>
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default MealAddFormSheet;
