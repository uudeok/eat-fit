'use client';

import styles from '@styles/modal/mealAddFormSheet.module.css';
import { useModal } from '@/hooks';
import Icons from '@/assets';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Text } from '../common';
import { BottomSheet } from '../common/Modal';

type FormValues = {
    foodName: string;
    calories: string;
    carbohydrate: string;
    protein: string;
    fat: string;
    content: string;
};

const MealAddFormSheet = () => {
    const { isOpen, onClose } = useModal('mealAddForm');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            foodName: '',
            calories: '',
            carbohydrate: '',
            protein: '',
            fat: '',
            content: '',
        },
    });

    const NUTRIENTS: { label: string; name: keyof FormValues; unit: string }[] = [
        { label: '칼로리', name: 'calories', unit: 'kcal' },
        { label: '탄수화물', name: 'carbohydrate', unit: 'g' },
        { label: '단백질', name: 'protein', unit: 'g' },
        { label: '지방', name: 'fat', unit: 'g' },
    ];

    const onSubmit = handleSubmit((data) => console.log(data));

    const handleMemoValue = (inputValue: string) => {
        setValue('content', inputValue);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <div className={styles.header}>
                    <Text bold size="xlg">
                        음식 직접 입력하기
                    </Text>
                    <Icons.FillXmark width={24} onClick={onClose} />
                </div>

                <Text bold>음식 이름 (필수)</Text>
                <input
                    {...register('foodName', { required: true })}
                    placeholder="음식 이름"
                    className={styles.foodNameInput}
                />

                <Text bold>영양 정보</Text>
                <div className={styles.nutrientGrid}>
                    {NUTRIENTS.map((nutrient, idx) => (
                        <div key={idx}>
                            <Text bold>{nutrient.label}</Text>
                            <div className={styles.inputWithUnit}>
                                <input
                                    {...register(nutrient.name)}
                                    placeholder="0"
                                    onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.replace(/[^0-9.]/g, '');
                                    }}
                                />
                                <Text bold>{nutrient.unit}</Text>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <Textarea placeholder="간단한 메모를 남겨보세요 (선택)" name="memo" register={register}/> */}

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg">
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default MealAddFormSheet;