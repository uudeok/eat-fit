'use client';

import styles from '@styles/modal/mealFormSheet.module.css';
import { useModal } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Text, ListCol } from '../common';
import { BottomSheet } from '../common/Modal';
import { Input, Textarea } from '../common/Form';
import SheetHeader from '../layout/SheetHeader';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { usePathname } from 'next/navigation';
import { useUpdateMeals } from '@/service/mutations';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';
import { DecodeMealItemType, encodeUpdateMeal } from '@/service/mappers/mealsMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealsFormSchema, mealsFormValidation } from '@/shared/utils/validation/mealsForm';

/* 해당 바텀시트를 /meals/add or /meals/[id] 에서 open 한다
   1. path 가 add 이면 데이터를 생성 -> createMealsData
   2. path 가 id 이면 데이터를 수정 -> updateMealsData
*/

const NUTRIENTS: { label: string; key: keyof DecodeMealItemType; unit: string }[] = [
    { label: '칼로리', key: 'calories', unit: 'kcal' },
    { label: '탄수화물', key: 'carbohydrate', unit: 'g' },
    { label: '단백질', key: 'protein', unit: 'g' },
    { label: '지방', key: 'fat', unit: 'g' },
];

const MealFormSheet = () => {
    const pathname = usePathname();
    const path = pathname.split('/').pop();
    const isEditMode = path !== 'add';

    const { isOpen, onClose } = useModal(ModalType.mealForm);
    const { mealItem, addMeal, updateMeal } = useMealsStore();
    const { data: mealDetail } = useFetchMealDetail(Number(path));

    const { mutate: updateMeals } = useUpdateMeals();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DecodeMealItemType>({
        resolver: zodResolver(mealsFormSchema),
        defaultValues: {
            id: mealItem?.id || Date.now(),
            foodName: mealItem?.foodName,
            calories: mealItem?.calories,
            carbohydrate: mealItem?.carbohydrate,
            protein: mealItem?.protein,
            fat: mealItem?.fat,
            content: mealItem?.content,
        },
    });

    const createMealsData = (data: DecodeMealItemType) => {
        if (mealItem) {
            updateMeal(data);
        } else {
            addMeal(data);
        }

        onClose();
    };

    /* meals 데이터 수정 */
    const updateMealsData = (data: DecodeMealItemType) => {
        if (mealItem && mealDetail) {
            const updatedMeals = mealDetail.mealItem.map((meal) => {
                if (meal.id === mealItem.id) {
                    return {
                        ...meal,
                        ...data,
                    };
                }
                return meal;
            });

            const updateData = encodeUpdateMeal({
                ...mealDetail,
                mealItem: updatedMeals,
            });

            updateMeals({
                ...updateData,
            });
        }
        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form className={styles.layout}>
                <SheetHeader content="음식 직접 입력하기" onClose={onClose} />

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

                <div className={styles.addBtn}>
                    {isEditMode ? (
                        <Button role="confirm" size="lg" onClick={handleSubmit(updateMealsData)}>
                            수정하기
                        </Button>
                    ) : (
                        <Button role="confirm" size="lg" onClick={handleSubmit(createMealsData)}>
                            추가하기
                        </Button>
                    )}
                </div>
            </form>
        </BottomSheet>
    );
};

export default MealFormSheet;
