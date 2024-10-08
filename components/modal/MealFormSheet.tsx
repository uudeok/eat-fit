'use client';

import styles from '@styles/modal/mealAddFormSheet.module.css';
import { useModal } from '@/hooks';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { Text, ListCol } from '../common';
import { BottomSheet } from '../common/Modal';
import { Input, Textarea } from '../common/Form';
import SheetHeader from '../layout/SheetHeader';
import { ModalType } from '../common/Modal/OverlayContainer';
import { calorieValidation } from '@/shared/utils';
import { MealItemType } from '@/service/@types';
import { useMealsStore } from '@/shared/store/useMealsStore';
import { usePathname } from 'next/navigation';
import { useUpdateMeals } from '@/service/mutations';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';

/* mealAddForm 은 두군데에서 사용한다
   1. meal 데이터 생성할때 
   2, meal 데이터 수정할때
   : 데이터 수정할땐 데이터 상세 정보를 가져온다 useFetchMealDetail
*/

const NUTRIENTS: { label: string; key: keyof MealItemType; unit: string }[] = [
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

    const { register, handleSubmit } = useForm<MealItemType>({
        defaultValues: {
            id: mealItem ? mealItem.id : Date.now(),
            food_name: mealItem ? mealItem.food_name : '',
            calories: mealItem ? mealItem.calories : 0,
            carbohydrate: mealItem ? mealItem.carbohydrate : 0,
            protein: mealItem ? mealItem.protein : 0,
            fat: mealItem ? mealItem.fat : 0,
            content: mealItem ? mealItem.content : null,
        },
    });

    const createMealsData = (data: MealItemType) => {
        if (mealItem) {
            updateMeal(data);
        } else {
            addMeal(data);
        }

        onClose();
    };

    /* meals 데이터 수정 */
    const updateMealsData = (data: MealItemType) => {
        if (mealItem && mealDetail) {
            const updatedMeals = mealDetail.meal.map((m) => {
                if (m.id === mealItem.id) {
                    return {
                        ...m,
                        ...data,
                    };
                }
                return m;
            });

            updateMeals({
                id: mealDetail.id,
                serving_time: mealDetail.serving_time,
                meal: updatedMeals,
                meal_type: mealDetail.meal_type,
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
                            name="food_name"
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
                                        onInput={calorieValidation}
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

/* 기존  로직 */

// 'use client';

// import styles from '@styles/modal/mealAddFormSheet.module.css';
// import { useModal } from '@/hooks';
// import { useForm } from 'react-hook-form';
// import { Button } from '../common/Button';
// import { Text, ListCol } from '../common';
// import { BottomSheet } from '../common/Modal';
// import { Input, Textarea } from '../common/Form';
// import SheetHeader from '../layout/SheetHeader';
// import { ModalType } from '../common/Modal/OverlayContainer';
// import { calorieValidation } from '@/shared/utils';
// import { MealItemType } from '@/service/@types';
// import { useMealsStore } from '@/shared/store/useMealsStore';

// const NUTRIENTS: { label: string; key: keyof MealItemType; unit: string }[] = [
//     { label: '칼로리', key: 'calories', unit: 'kcal' },
//     { label: '탄수화물', key: 'carbohydrate', unit: 'g' },
//     { label: '단백질', key: 'protein', unit: 'g' },
//     { label: '지방', key: 'fat', unit: 'g' },
// ];

// const MealAddFormSheet = () => {
//     const { isOpen, onClose } = useModal(ModalType.mealAddForm);

//     const { addMeal, mealItem, updateMeal } = useMealsStore();

//     const { register, handleSubmit } = useForm<MealItemType>({
//         defaultValues: {
//             id: mealItem ? mealItem.id : Date.now(),
//             food_name: mealItem ? mealItem.food_name : '',
//             calories: mealItem ? mealItem.calories : 0,
//             carbohydrate: mealItem ? mealItem.carbohydrate : 0,
//             protein: mealItem ? mealItem.protein : 0,
//             fat: mealItem ? mealItem.fat : 0,
//             content: mealItem ? mealItem.content : null,
//         },
//     });

//     /* mealItem 있다면 store 에 데이터를 수정하고 없다면 생성 */
//     const submitMealsData = handleSubmit((data) => {
//         if (mealItem) {
//             updateMeal(data);
//         } else {
//             addMeal(data);
//         }

//         onClose();
//     });

//     return (
//         <BottomSheet isOpen={isOpen} onClose={onClose}>
//             <form onSubmit={submitMealsData} className={styles.layout}>
//                 <SheetHeader content="음식 직접 입력하기" onClose={onClose} />

//                 <ListCol
//                     top={<Text bold>음식 이름 (필수)</Text>}
//                     bottom={
//                         <Input
//                             register={register}
//                             rules={{ required: true }}
//                             placeholder="음식 이름"
//                             name="food_name"
//                         />
//                     }
//                 />

//                 <div className={styles.nutrientGrid}>
//                     {NUTRIENTS.map((nutrient, idx) => (
//                         <div key={idx}>
//                             <ListCol
//                                 top={<Text bold>{nutrient.label}</Text>}
//                                 bottom={
//                                     <Input
//                                         register={register}
//                                         name={nutrient.key}
//                                         placeholder="0"
//                                         unit={nutrient.unit}
//                                         onInput={calorieValidation}
//                                     />
//                                 }
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <Textarea register={register} name="content" placeholder="예시) 치팅데이 (선택)" />

//                 <div className={styles.addBtn}>
//                     <Button role="confirm" size="lg">
//                         추가하기
//                     </Button>
//                 </div>
//             </form>
//         </BottomSheet>
//     );
// };

// export default MealAddFormSheet;
