'use client';

import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Button } from '../common/Button';
import SheetHeader from '../layout/SheetHeader';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';
import { weightValidation } from '@/shared/utils';
import { useCalendarStore } from '@/shared/store/useCalendarStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { useUpdateDailySpec } from '@/service/mutations/useUpdateDailySpec';
import { useFetchGoalInProgress } from '@/service/queries';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

type FormValues = {
    today_weight: null | number;
};

const TodayWeightSheet = () => {
    const { data: goalData } = useFetchGoalInProgress();

    const { isOpen, onClose } = useModal(ModalType.todayWeight);
    const { selectedDate } = useCalendarStore();

    const formattedDate = dayjs(selectedDate).format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySpec } = useFetchDailySpec(formattedDate);

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            today_weight: dailySpec?.today_weight || null,
        },
    });

    const { mutate: createDailySpec } = useCreateDailySpec(formattedDate);
    const { mutate: updateDailySpec } = useUpdateDailySpec(formattedDate);

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
                goal_id: goalData?.id!,
                today_weight: data.today_weight,
                mood: null,
                entry_date: formattedDate,
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
