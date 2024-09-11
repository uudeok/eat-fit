'use client';

import styles from '@styles/modal/mealDetailSheet.module.css';
import { useModal } from '@/hooks';
import { usePathname } from 'next/navigation';
import useMealItemStore from '@/shared/store/useMealItemStore';
import { FieldValues, useForm } from 'react-hook-form';
import { BottomSheet } from '../common/Modal';
import { Text, ProgressBar, ListRow, Penel } from '../common';
import { Textarea } from '../common/Form';
import { Button } from '../common/Button';

const MealDetailSheet = () => {
    const pathname = usePathname();
    const { isOpen, onClose } = useModal('mealDetail');
    const { selectedMealItem } = useMealItemStore();
    const { register, handleSubmit } = useForm();

    if (!selectedMealItem) return null;

    const NUTRIENTS = [
        { key: '칼로리', value: selectedMealItem.calories, standard: 1600, unit: 'kcal' },
        { key: '탄수화물', value: selectedMealItem.carbohydrate, standard: 180, unit: 'g' },
        { key: '단백질', value: selectedMealItem.protein, standard: 120, unit: 'g' },
        { key: '지방', value: selectedMealItem.fat, standard: 44, unit: 'g' },
    ];

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <BottomSheet onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.header}>
                    <Text bold size="xxlg">
                        {selectedMealItem.food_name}
                    </Text>
                    <Text size="sm">({selectedMealItem.serving_size}g)</Text>
                </div>

                {NUTRIENTS.map((nutrient) => (
                    <Penel key={nutrient.key} direction="column">
                        <ListRow
                            left={
                                <div className={styles.information}>
                                    <Text bold>{nutrient.key}</Text>
                                    <Text bold>
                                        {nutrient.value}
                                        {nutrient.unit}
                                    </Text>
                                </div>
                            }
                            right={<ProgressBar current={nutrient.value} total={nutrient.standard} size="sm" />}
                        />
                    </Penel>
                ))}

                <Textarea
                    name="memo"
                    id="meal-memo"
                    defaultValue={selectedMealItem.content || ''}
                    register={register}
                />

                <div className={styles.reviseBtn}>
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

export default MealDetailSheet;
