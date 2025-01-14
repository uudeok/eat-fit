'use client';

import styles from '@styles/modal/calorieEdit.module.css';
import SheetHeader from '../layout/SheetHeader';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useForm } from 'react-hook-form';
import { Input } from '../common/Form';
import { Button } from '../common/Button';
import { recalculateCaloriesToGoal } from '@/shared/utils';
import { GoalCaloriesInfoWithStandardType, GoalRegisterType } from '@/service/@types';
import { caloriesValidation } from '@/shared/utils/validation';
import { useCache } from '@/hooks/useCache';
import { SESSION_KEYS } from '@/constants';
import { useRouter } from 'next/navigation';

type FormValue = {
    dailyCalories: number;
};

const CalorieEditSheet = () => {
    const router = useRouter();
    const sessionCache = useCache('session');
    const initialData: GoalCaloriesInfoWithStandardType | null = sessionCache.getItem(SESSION_KEYS.GOAL_KACL);
    const registerData: GoalRegisterType | null = sessionCache.getItem(SESSION_KEYS.GOAL);

    const { isOpen, onClose } = useModal(ModalType.calorieEdit);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            dailyCalories: initialData?.dailyCalories,
        },
    });

    if (!initialData || !registerData) {
        alert('목표 데이터가 없습니다. 첫 번째 단계로 돌아가 입력해 주세요.');
        router.push('/goals');
        return;
    }

    const onSubmit = handleSubmit((data) => {
        initialData.goalPeriod = recalculateCaloriesToGoal({
            currentCalories: initialData.standard,
            newCalories: data.dailyCalories,
            currentWeight: registerData.weight,
            targetWeight: registerData.targetWeight,
        });

        initialData.dailyCalories = data.dailyCalories;

        sessionCache.setItem(SESSION_KEYS.GOAL_KACL, initialData);

        onClose();
    });

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <SheetHeader content="섭취 칼로리 직접 입력하기" onClose={onClose} />

                <div className={styles.main}>
                    <Input
                        type="number"
                        inputMode="numeric"
                        register={register}
                        name="dailyCalories"
                        placeholder="0"
                        unit="kcal"
                        onInput={caloriesValidation}
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
