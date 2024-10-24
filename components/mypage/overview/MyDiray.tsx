'use client';

import { useCalendar } from '@/hooks';
import { Spinner } from '../../common';
import { DATE_FORMAT } from '@/constants';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import dayjs from 'dayjs';
import DiaryForm from './DiaryForm';
import DiaryCalendar from './DiaryCalendar';
import SectionHeader from '@/components/layout/SectionHeader';

const MyDiray = () => {
    const { curMonth, curYear } = useCalendar();

    const firstDay = dayjs().year(curYear).month(curMonth).date(1).format(DATE_FORMAT['YYYY-MM-DD']);
    const lastDay = dayjs().year(curYear).month(curMonth).endOf('month').format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySteps } = useFetchDailyStepsInRange(firstDay, lastDay);

    if (!dailySteps) return <Spinner />;

    return (
        <>
            <SectionHeader title="모아보기" iconName="FillStaggeredBar" />

            <div className="flex flex-col gap-6 rounded-lg shadow-lg ">
                <DiaryCalendar dailySteps={dailySteps} />
                <DiaryForm dailySteps={dailySteps} />
            </div>
        </>
    );
};

export default MyDiray;
