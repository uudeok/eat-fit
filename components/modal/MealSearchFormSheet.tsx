'use client';

import styles from '@styles/modal/mealSearchFormSheet.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { BottomSheet } from '../common/Modal';
import { useMealsStore } from '@/shared/store/useMealsStore';
import SheetHeader from '../layout/SheetHeader';
import { Badge, ListCol, Text } from '../common';
import { Input, Textarea } from '../common/Form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealsFormSchema, mealsFormValidation } from '@/shared/utils/validation';
import { DecodeMealItemType } from '@/service/mappers/mealsMapper';
import { NUTRIENTS } from '@/constants';
import { Button } from '../common/Button';
import { useEffect } from 'react';
import { calculateNutrients } from '@/shared/utils';

const MealSearchFormSheet = () => {
    const { onClose, isOpen } = useModal(ModalType.mealSearchFormSheet);
    const { searchMeal, addMeal } = useMealsStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<DecodeMealItemType>({
        resolver: zodResolver(mealsFormSchema),
        defaultValues: {
            id: Date.now(),
            foodName: searchMeal?.foodName,
            calories: searchMeal?.calories,
            carbohydrate: searchMeal?.carbohydrate,
            protein: searchMeal?.protein,
            fat: searchMeal?.fat,
            content: searchMeal?.content,
            servingSize: searchMeal?.servingSize,
        },
    });

    const servingSize = watch('servingSize');

    useEffect(() => {
        if (searchMeal && servingSize) {
            const updatedNutrients = calculateNutrients(searchMeal, servingSize);
            setValue('calories', updatedNutrients.calories);
            setValue('carbohydrate', updatedNutrients.carbohydrate);
            setValue('protein', updatedNutrients.protein);
            setValue('fat', updatedNutrients.fat);
        }
    }, [servingSize, searchMeal, setValue]);

    if (!searchMeal) return;

    const createMealsData = (data: DecodeMealItemType) => {
        addMeal(data);
        onClose();
    };

    return (
        <BottomSheet onClose={onClose} isOpen={isOpen}>
            <SheetHeader onClose={onClose} content="수정도 가능해요😆" />
            <form className={styles.layout}>
                <ListCol
                    top={<Text bold>음식 이름 (필수)</Text>}
                    bottom={
                        <Input
                            register={register}
                            rules={{ required: true }}
                            placeholder="음식 이름"
                            name="foodName"
                            errors={errors}
                        />
                    }
                />

                <ListCol
                    top={<Text bold>섭취량(g)</Text>}
                    bottom={
                        <Input
                            inputMode="numeric"
                            register={register}
                            placeholder="섭취량(g)"
                            name="servingSize"
                            errors={errors}
                            unit="g"
                        />
                    }
                />

                <div className={styles.nutrientGrid}>
                    {NUTRIENTS.map((nutrient, idx) => (
                        <div key={idx}>
                            <ListCol
                                top={<Text bold>{nutrient.label}</Text>}
                                bottom={
                                    <Input
                                        register={register}
                                        name={nutrient.key}
                                        placeholder="0"
                                        unit={nutrient.unit}
                                        onInput={mealsFormValidation}
                                        errors={errors}
                                    />
                                }
                            />
                        </div>
                    ))}
                </div>

                <Textarea register={register} name="content" placeholder="예시) 치팅데이 (선택)" />

                <Button role="confirm" size="lg" onClick={handleSubmit(createMealsData)}>
                    추가하기
                </Button>
            </form>
        </BottomSheet>
    );
};

export default MealSearchFormSheet;
