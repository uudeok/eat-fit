'use client';

import { Spinner } from '../../common';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import DiaryForm from './DiaryForm';
import DiaryCalendar from './DiaryCalendar';
import SectionHeader from '@/components/layout/SectionHeader';
import { useCalendar } from '@/hooks';
import { getMonthRange } from '@/shared/utils';
import { useEffect } from 'react';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';

const MyDiray = () => {
    const { currentYear, currentMonth } = useCalendar();
    const { setSelectedDate } = useSelectedDateStore();

    const { firstDay, lastDay } = getMonthRange(currentYear, currentMonth);
    const { data: dailySteps } = useFetchDailyStepsInRange(firstDay, lastDay);

    useEffect(() => {
        return () => {
            setSelectedDate(new Date());
        };
    }, []);

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
