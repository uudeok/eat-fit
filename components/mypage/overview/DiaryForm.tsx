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
import { useRouter } from 'next/navigation';

type FormValue = {
    diary: string | null;
};

const DiaryForm = ({ dailySteps }: { dailySteps: DecodeDailyStepInRangeType }) => {
    const router = useRouter();
    const { selectedDate, getFormattedDate, setSelectedDate } = useSelectedDateStore();

    const formattedDate = getFormattedDate();
    const clickedDate = dayjs(selectedDate).format(DATE_FORMAT['M.D']);
    const dayOfWeek = dayjs(selectedDate).format(DATE_FORMAT.ddd);

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { mutateAsync: updateDailySpec, isPending: isUpdating } = useUpdateDailySpec();
    const { mutateAsync: createDailySpec, isPending: isCreating } = useCreateDailySpec(formattedDate);

    const { register, handleSubmit, setValue } = useForm<FormValue>({
        defaultValues: {
            diary: '',
        },
    });

    const dailyData = dailySteps.steps.find((step) => step.dailyStep.entryDate === formattedDate);

    useEffect(() => {
        setValue('diary', dailyData?.dailyStep.diary || null);
    }, [dailySteps, formattedDate, setValue]);

    const submitDiary = (data: FormValue) => {
        if (!data.diary) return;

        const process = window.confirm('저장하시겠습니까?');
        if (!process) return;

        if (dailyData) {
            const dailySpecData = {
                id: dailyData.dailyStep.id,
                mood: dailyData.dailyStep.mood,
                todayWeight: dailyData.dailyStep.todayWeight,
                diary: data.diary,
            };

            const updateDate = encodeUpdateDailySpec({ ...dailySpecData });

            updateDailySpec(updateDate);
        } else {
            const initalData = {
                goalId: goalData?.id!,
                entryDate: formattedDate,
                todayWeight: 0,
                mood: null,
                diary: data.diary,
            };

            const createData = encodeCreateDailySpec({ ...initalData });

            createDailySpec(createData);
        }
    };

    const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setSelectedDate(selectedDate);
        router.push('/home');
    };

    return (
        <form className="mt-5">
            <Textarea
                isLoading={isCreating || isUpdating}
                register={register}
                name="diary"
                label="일기"
                className="h-40"
                placeholder={`${clickedDate} (${dayOfWeek}) 일상을 기록해보세요`}
                rules={{
                    maxLength: {
                        value: 150,
                        message: '최대 150자까지 입력 가능합니다',
                    },
                }}
            />

            <div className="p-4 flex flex-row space-x-4">
                <Button role="round" onClick={handleRedirect}>
                    선택한 날짜로 이동
                </Button>
                <Button role="round" onClick={handleSubmit(submitDiary)}>
                    {dailyData?.dailyStep.diary ? '일기 수정' : '일기 저장'}
                </Button>
            </div>
        </form>
    );
};

export default DiaryForm;
