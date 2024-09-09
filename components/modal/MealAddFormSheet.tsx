import styles from '@styles/modal/mealAddFormSheet.module.css';
import { useModal } from '@/hooks';
import BottomSheet from '../common/BottomSheet';
import InputBase from '../common/Input';
import Text from '../common/Text';
import { useState } from 'react';
import Button from '../common/Button';
import Icons from '@/assets';

const MealAddFormSheet = () => {
    const { isOpen, onClose } = useModal('mealAddForm');
    const [inputValue, setInputValue] = useState({
        food_name: '',
        calories: '',
        carbohydrate: '',
        protein: '',
        fat: '',
    });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const NUTRIENTS = [
        { label: '칼로리', name: 'calories', value: inputValue.calories, unit: 'kcal' },
        { label: '탄수화물', name: 'carbohydrate', value: inputValue.carbohydrate, unit: 'g' },
        { label: '단백질', name: 'protein', value: inputValue.protein, unit: 'g' },
        { label: '지방', name: 'fat', value: inputValue.fat, unit: 'g' },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(inputValue);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form className={styles.layout} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <Text bold size="xlg">
                        음식 직접 입력하기
                    </Text>
                    <Icons.FillXmark width={24} onClick={onClose} />
                </div>

                <Text bold>음식 이름 (필수)</Text>
                <InputBase
                    placeholder="음식 이름"
                    onChange={onChangeInput}
                    name="food_name"
                    value={inputValue.food_name}
                    required
                    className={styles.foodNameInput}
                />

                <Text bold>영양 정보</Text>
                <div className={styles.nutrientGrid}>
                    {NUTRIENTS.map((nutrient, index) => (
                        <div key={index}>
                            <Text>{nutrient.label}</Text>
                            <div className={styles.inputWithUnit}>
                                <InputBase
                                    onChange={onChangeInput}
                                    name={nutrient.name}
                                    value={nutrient.value}
                                    placeholder="0"
                                />
                                <Text bold>{nutrient.unit}</Text>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg" disabled={!inputValue.food_name}>
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default MealAddFormSheet;
