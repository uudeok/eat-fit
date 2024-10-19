'use client';

import styles from '@styles/modal/mealTimeSheet.module.css';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { Button } from '../common/Button';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';
import { LoadingBar, Text, TextToggle } from '../common';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { padStartToZero } from '@/shared/utils';
import { usePathname } from 'next/navigation';
import { useUpdateMeals } from '@/service/mutations';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';
import { encodeUpdateMeal } from '@/service/mappers/mealsMapper';

export type ServingTimeType = {
    kstTime: Date;
    period: string;
    hour: number;
    minutes: number;
};

const MealTimeSheet = () => {
    const pathname = usePathname();
    const mealId = pathname.split('/').pop();

    const { isOpen, onClose } = useModal(ModalType.mealTime);
    const { selectedDate } = useSelectedDateStore();

    const { data: mealDetail } = useFetchMealDetail(Number(mealId));

    const { mutate: updateMeals } = useUpdateMeals();

    if (!mealDetail) return <LoadingBar />;

    const { register, handleSubmit, setValue } = useForm<ServingTimeType>({
        defaultValues: {
            period: mealDetail?.servingTime?.period,
            hour: mealDetail?.servingTime?.hour,
            minutes: mealDetail?.servingTime?.minutes,
        },
    });

    const handlePeriodToggle = (value: string) => {
        setValue('period', value);
    };

    const submitServingTime = (data: ServingTimeType) => {
        const updatedData = encodeUpdateMeal({
            ...mealDetail,
            servingTime: { ...data, kstTime: selectedDate },
        });

        updateMeals({
            ...updatedData,
        });

        onClose();
    };

    const hourValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.length > 2) {
            value = value.slice(0, 2);
        }

        let numValue = Number(value);

        if (numValue >= 13 && numValue <= 24) {
            numValue -= 12;
        } else if (numValue > 24) {
            numValue = 12;
        }

        setValue('hour', numValue);
    };

    const minutesValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value.length > 2) {
            value = value.slice(0, 2);
        }

        let numValue = Number(value);

        if (numValue > 59) {
            numValue = 59;
        }

        setValue('minutes', numValue);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content="언제 먹었나요?" onClose={onClose} />

            <form className={styles.layout} onSubmit={handleSubmit(submitServingTime)}>
                <TextToggle
                    left="오전"
                    right="오후"
                    onClick={handlePeriodToggle}
                    initialValue={mealDetail.servingTime?.period}
                />

                <div className={styles.timeTable}>
                    <Input
                        register={register}
                        rules={{ required: true }}
                        type="number"
                        name="hour"
                        placeholder="00"
                        className={styles.timeInput}
                        onInput={hourValidation}
                        onBlur={(e) => padStartToZero(e, 2)}
                    />
                    <Text bold size="xxlg" color="var(--grey700)">
                        :
                    </Text>
                    <Input
                        register={register}
                        rules={{ required: true }}
                        type="number"
                        name="minutes"
                        placeholder="00"
                        className={styles.timeInput}
                        onInput={minutesValidation}
                        onBlur={(e) => padStartToZero(e, 2)}
                    />
                </div>

                <Button role="confirm" size="lg">
                    완료
                </Button>
            </form>
        </BottomSheet>
    );
};

export default MealTimeSheet;
