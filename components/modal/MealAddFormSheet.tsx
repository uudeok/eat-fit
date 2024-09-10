import styles from '@styles/modal/mealAddFormSheet.module.css';
import { useModal } from '@/hooks';
import BottomSheet from '../common/BottomSheet';
import Text from '../common/Text';
import Button from '../common/Button';
import Icons from '@/assets';
import { useForm } from 'react-hook-form';

type FormValues = {
    foodName: string;
    calories: string;
    carbohydrate: string;
    protein: string;
    fat: string;
};

const MealAddFormSheet = () => {
    const { isOpen, onClose } = useModal('mealAddForm');
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            foodName: '',
            calories: '',
            carbohydrate: '',
            protein: '',
            fat: '',
        },
    });

    const NUTRIENTS: { label: string; name: keyof FormValues; unit: string }[] = [
        { label: '칼로리', name: 'calories', unit: 'kcal' },
        { label: '탄수화물', name: 'carbohydrate', unit: 'g' },
        { label: '단백질', name: 'protein', unit: 'g' },
        { label: '지방', name: 'fat', unit: 'g' },
    ];

    const onSubmit = handleSubmit((data) => console.log(data));

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
