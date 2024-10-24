'use client';

import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Button } from '../common/Button';
import SheetHeader from '../layout/SheetHeader';
import { Input } from '../common/Form';
import { useForm } from 'react-hook-form';
import { weightValidation } from '@/shared/utils';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { useUpdateDailySpec } from '@/service/mutations/useUpdateDailySpec';
import { useFetchGoalsByStatus } from '@/service/queries';
import { encodeCreateDailySpec, encodeUpdateDailySpec } from '@/service/mappers/dailyMapper';

type FormValues = {
    todayWeight: number;
};

const TodayWeightSheet = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');

    const { isOpen, onClose } = useModal(ModalType.todayWeight);
    const { getFormattedDate } = useSelectedDateStore();

    const formattedDate = getFormattedDate();

    const { data: dailySpec } = useFetchDailySpec(formattedDate);

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            todayWeight: dailySpec?.todayWeight,
        },
    });

    const { mutate: createDailySpec } = useCreateDailySpec(formattedDate);
    const { mutate: updateDailySpec } = useUpdateDailySpec();

    const submitTodayWeight = handleSubmit((data) => {
        if (!data) return;

        if (dailySpec) {
            const dailySpecData = {
                id: dailySpec.id,
                todayWeight: data.todayWeight,
                mood: dailySpec.mood,
                diary: dailySpec.diary,
            };

            const updateData = encodeUpdateDailySpec({ ...dailySpecData });
            updateDailySpec(updateData);
        } else {
            const initialData = {
                goalId: goalData?.id!,
                todayWeight: data.todayWeight,
                mood: null,
                entryDate: formattedDate,
            };

            const createData = encodeCreateDailySpec({ ...initialData });

            createDailySpec(createData);
        }

        onClose();
    });

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content="오늘 체중 입력" onClose={onClose} />

            <form onSubmit={submitTodayWeight} className="flex flex-col gap-6 p-4">
                <Input
                    register={register}
                    name="todayWeight"
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
