'use client';

import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Button } from '../common/Button';
import SheetHeader from '../layout/SheetHeader';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';
import { getLocalStorageItem, weightValidation } from '@/shared/utils';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { GoalType } from '@/service/@types/res.type';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { useUpdateDailySpec } from '@/service/mutations/useUpdateDailySpec';

type FormValues = {
    today_weight: null | number;
};

const TodayWeightSheet = () => {
    const storedGoalData: GoalType | null = getLocalStorageItem('goalData');

    if (!storedGoalData) {
        throw new Error('goalData가 없습니다');
    }

    const { isOpen, onClose } = useModal(ModalType.todayWeight);
    const { selectedDate } = useCalendarStore();
    const { data: dailySpec } = useFetchDailySpec(selectedDate);

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            today_weight: dailySpec?.today_weight || null,
        },
    });

    const { mutate: createDailySpec } = useCreateDailySpec(selectedDate);
    const { mutate: updateDailySpec } = useUpdateDailySpec(selectedDate);

    const submitTodayWeight = handleSubmit((data) => {
        if (!data) return;

        if (dailySpec) {
            const updateData = {
                id: dailySpec.id,
                today_weight: data.today_weight,
                mood: dailySpec.mood,
            };

            updateDailySpec(updateData);
        } else {
            const initialData = {
                goal_id: storedGoalData.id,
                today_weight: data.today_weight,
                mood: null,
                entry_date: selectedDate,
            };

            createDailySpec(initialData);
        }

        onClose();
    });

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content="오늘 체중 입력" onClose={onClose} />

            <form onSubmit={submitTodayWeight} className="flex flex-col gap-6 p-4">
                <Input
                    register={register}
                    name="today_weight"
                    placeholder="00.0"
                    unit="kg"
                    rules={{
                        required: '몸무게를 입력해주세요',
                    }}
                    onInput={weightValidation}
                />

                <Button role="confirm" size="lg">
                    저장
                </Button>
            </form>
        </BottomSheet>
    );
};

export default TodayWeightSheet;
