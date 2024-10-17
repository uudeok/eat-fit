'use client';

import styles from '@styles/modal/calorieEdit.module.css';
import SheetHeader from '../layout/SheetHeader';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useForm } from 'react-hook-form';
import { Input } from '../common/Form';
import { Button } from '../common/Button';
import { calorieValidation, getLocalStorageItem, recalculateCaloriesToGoal, setLocalStorageItem } from '@/shared/utils';
import { GoalCaloriesInfoType } from '@/service/@types';

type FormValue = {
    dailyCalories: number;
};

const CalorieEditSheet = () => {
    const initialData: GoalCaloriesInfoType | null = getLocalStorageItem('goalCalorie');
    const { isOpen, onClose } = useModal(ModalType.calorieEdit);

    if (!initialData) {
        throw new Error('로컬 스토리지에 goalCalorie 데이터가 없습니다.');
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            dailyCalories: initialData?.dailyCalories,
        },
    });

    /* 입력한 칼로리 기반 목표일을 계산해서 로컬스토리지에 저장해준다 */
    const onSubmit = handleSubmit((data) => {
        initialData.goalPeriod = recalculateCaloriesToGoal(
            initialData.dailyCalories,
            initialData.goalPeriod,
            data.dailyCalories
        );
        initialData.dailyCalories = data.dailyCalories;

        setLocalStorageItem('goalCalorie', initialData);

        onClose();
    });

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <SheetHeader content="섭취 칼로리 직접 입력하기" onClose={onClose} />

                <div className={styles.main}>
                    <Input
                        type="number"
                        register={register}
                        name="dailyCalories"
                        placeholder="0"
                        unit="kcal"
                        onInput={calorieValidation}
                        rules={{
                            min: {
                                value: 500,
                                message: '최소 500kcal 이상 입력 가능합니다',
                            },
                            maxLength: {
                                value: 4,
                                message: '천단위까지만 입력 가능합니다.',
                            },
                        }}
                        errors={errors}
                    />
                </div>

                <Button role="confirm" size="lg">
                    완료
                </Button>
            </form>
        </BottomSheet>
    );
};

export default CalorieEditSheet;
