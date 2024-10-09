'use client';

import styles from '@styles/modal/mealTimeSheet.module.css';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { Button } from '../common/Button';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';
import { Text, TextToggle } from '../common';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { convertToKST, convertToServingTime, padStartToZero } from '@/shared/utils';
import { usePathname } from 'next/navigation';
import { useUpdateMeals } from '@/service/mutations';
import { useFetchMealDetail } from '@/service/queries/useFetchMealDetail';
import { MealsType } from '@/service/@types/res.type';

export type ServingTimeType = {
    period: string | null;
    hour: number | null | string;
    minutes: number | null | string;
};

/* serving_time 은 무조건 Null 값으로라도 meals 테이블에 존재한다
   meals 데이터를 가져와서 나머지는 기존 데이터를 그대로 넣어주고 serving_time 만 업데이트 한다
 */

const MealTimeSheet = () => {
    const pathname = usePathname();
    const mealId = pathname.split('/').pop();

    const { isOpen, onClose } = useModal(ModalType.mealTime);
    const { selectedDate } = useSelectedDateStore();

    const { data: mealDetail = {} as MealsType } = useFetchMealDetail(Number(mealId));
    const { mutate: updateMeals } = useUpdateMeals(mealDetail.entry_date);

    const initialServingTime = convertToKST(mealDetail.serving_time!);

    const { register, handleSubmit, setValue } = useForm<ServingTimeType>({
        defaultValues: {
            period: initialServingTime ? initialServingTime.period : null,
            hour: initialServingTime ? initialServingTime.hour : null,
            minutes: initialServingTime ? initialServingTime.minutes : null,
        },
    });

    const handlePeriodToggle = (value: string) => {
        setValue('period', value);
    };

    const submitServingTime = (data: ServingTimeType) => {
        const { hour, minutes } = convertToServingTime(data);

        const updatedDate = new Date(selectedDate.getTime());
        const servingTime = new Date(updatedDate.setHours(hour, minutes));

        updateMeals({
            id: mealDetail.id,
            serving_time: servingTime,
            meal: mealDetail.meal,
            meal_type: mealDetail.meal_type,
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
                    initialValue={initialServingTime?.period}
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
