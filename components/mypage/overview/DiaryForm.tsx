'use client';

import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Form';
import { DATE_FORMAT } from '@/constants';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
dayjs.locale('ko');
import 'dayjs/locale/ko';
import { useCreateDailySpec, useUpdateDailySpec } from '@/service/mutations';
import { encodeCreateDailySpec, encodeUpdateDailySpec } from '@/service/mappers/dailyMapper';
import { DecodeDailyStepInRangeType } from '@/service/mappers/stepMapper';
import { useEffect } from 'react';
import { useFetchGoalsByStatus } from '@/service/queries';
import { confirmAction } from '@/shared/utils';

type FormValue = {
    diary: string | null;
};

const DiaryForm = ({ dailySteps }: { dailySteps: DecodeDailyStepInRangeType }) => {
    const { selectedDate, getFormattedDate } = useSelectedDateStore();

    const day = dayjs(selectedDate).format(DATE_FORMAT['M.D']);
    const dayOfWeek = dayjs(selectedDate).format(DATE_FORMAT.ddd);
    const currentDate = getFormattedDate();

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { mutateAsync: updateDailySpec, isPending: isUpdating } = useUpdateDailySpec();
    const { mutateAsync: createDailySpec, isPending: isCreating } = useCreateDailySpec();

    const { register, handleSubmit, setValue } = useForm<FormValue>({
        defaultValues: {
            diary: '',
        },
    });

    const dailyData = dailySteps.steps.find((step) => step.dailyStep.entryDate === currentDate);

    useEffect(() => {
        setValue('diary', dailyData?.dailyStep.diary || null);
    }, [dailySteps, currentDate, setValue]);

    const updateDiary = (data: FormValue) => {
        if (!dailyData || !confirmAction('삭제하시겠습니까?')) return;

        const deleteData = {
            id: dailyData.dailyStep.id,
            mood: dailyData.dailyStep.mood,
            todayWeight: dailyData.dailyStep.todayWeight,
            diary: null,
        };

        const updateData = encodeUpdateDailySpec({ ...deleteData });

        updateDailySpec(updateData);
    };

    const submitDiary = (data: FormValue) => {
        if (!data.diary || !confirmAction('저장하시겠습니까?')) return;

        if (dailyData) {
            const dailySpecData = {
                id: dailyData.dailyStep.id,
                mood: dailyData.dailyStep.mood,
                todayWeight: dailyData.dailyStep.todayWeight,
                diary: data.diary,
            };

            const updateData = encodeUpdateDailySpec({ ...dailySpecData });

            updateDailySpec(updateData);
        } else {
            const initalData = {
                goalId: goalData?.id!,
                entryDate: currentDate,
                todayWeight: 0,
                mood: null,
                diary: data.diary,
            };

            const createData = encodeCreateDailySpec({ ...initalData });

            createDailySpec(createData);
        }
    };

    return (
        <form className="mt-5">
            <Textarea
                isLoading={isCreating || isUpdating}
                register={register}
                name="diary"
                label="일기"
                className="h-40"
                placeholder={`${day} (${dayOfWeek}) 일상을 기록해보세요`}
                rules={{
                    maxLength: {
                        value: 150,
                        message: '최대 150자까지 입력 가능합니다',
                    },
                }}
            />

            <div className="p-4 flex flex-row space-x-4">
                <Button role="round" onClick={handleSubmit(updateDiary)}>
                    일기 삭제
                </Button>
                <Button role="round" onClick={handleSubmit(submitDiary)}>
                    {dailyData?.dailyStep.diary ? '일기 수정' : '일기 저장'}
                </Button>
            </div>
        </form>
    );
};

export default DiaryForm;
