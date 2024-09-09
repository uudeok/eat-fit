'use client';

import styles from '@styles/modal/mealItemSheet.module.css';
import { useModal } from '@/hooks';
import BottomSheet from '../common/BottomSheet';
import { usePathname } from 'next/navigation';
import useMealItemStore from '@/shared/store/useMealItemStore';
import Text from '../common/Text';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import List, { ListRow } from '../common/List';

const MealItemSheet = () => {
    const pathname = usePathname();
    const { isOpen, onClose } = useModal('mealItem');
    const { selectedMealItem } = useMealItemStore();

    if (!selectedMealItem) return null;

    const NUTRIENTS = [
        { key: '칼로리', value: selectedMealItem.calories, standard: 1600, unit: 'kcal' },
        { key: '탄수화물', value: selectedMealItem.carbohydrate, standard: 180, unit: 'g' },
        { key: '단백질', value: selectedMealItem.protein, standard: 120, unit: 'g' },
        { key: '지방', value: selectedMealItem.fat, standard: 44, unit: 'g' },
    ];
    return (
        <BottomSheet onClose={onClose} isOpen={isOpen}>
            <div className={styles.header}>
                <Text bold size="xxlg">
                    {selectedMealItem.food_name}
                </Text>
            </div>

            {NUTRIENTS.map((nutrient) => (
                <List key={nutrient.key} className={styles.nutrient}>
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
                </List>
            ))}

            <div className={styles.reviseBtn}>
                <Button role="confirm">수정</Button>
            </div>
        </BottomSheet>
    );
};

export default MealItemSheet;
