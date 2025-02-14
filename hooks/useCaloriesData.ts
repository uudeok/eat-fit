import { useMemo, useState } from 'react';
import { AverageCaloiresType, CaloiresType, getPastWeekDates, getPastWeeklyDates } from '@/shared/utils';
import { ChartOptions } from 'chart.js';
import { CalChartKeys } from '@/constants/charts';

const oneWeeks = 7;

const useCaloriesData = (viewMode: CalChartKeys) => {
    const [dailyCaloriesData, setDailyCaloriesData] = useState<CaloiresType[]>([]);
    const [weeklyAverageCalories, setWeeklyAverageCalories] = useState<AverageCaloiresType[]>([]);

    const pastWeekDates = getPastWeekDates('M.D');
    const pastWeeklyDates = getPastWeeklyDates(oneWeeks);

    const data = useMemo(() => {
        const labels = viewMode === 'daily' ? pastWeekDates : pastWeeklyDates.map((date) => date.endDate.short);

        const calories =
            viewMode === 'daily'
                ? dailyCaloriesData.map((data) => data.calories)
                : weeklyAverageCalories.map((data) => data.averageCalories);

        const burnedCalories =
            viewMode === 'daily'
                ? dailyCaloriesData.map((data) => data.burnedCalories)
                : weeklyAverageCalories.map((data) => data.averageBurnedCalories);

        return {
            labels,
            datasets: [
                {
                    label: '소모한 칼로리',
                    data: burnedCalories,
                    backgroundColor: '#FF5274',
                    datalabels: { color: '#ef5350' },
                    categoryPercentage: 1,
                    barPercentage: 0.9,
                },
                {
                    label: '섭취 칼로리',
                    data: calories,
                    backgroundColor: '#4593fc',
                    datalabels: { color: '#4593fc' },
                    categoryPercentage: 1,
                    barPercentage: 0.9,
                },
            ],
        };
    }, [viewMode, dailyCaloriesData, weeklyAverageCalories, pastWeekDates, pastWeeklyDates]);

    const options: ChartOptions<'bar'> = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { position: 'bottom' as const },
            title: { display: true },
            datalabels: {
                formatter: (value: number) => (value === 0 ? '' : value),
                align: 'top',
                anchor: 'end',
                labels: { title: { font: { weight: 'bold', size: 13 } } },
            },
        },
        scales: {
            x: { grid: { display: false } },
            y: { display: false },
        },
    };

    return { options, setDailyCaloriesData, setWeeklyAverageCalories, data };
};

export default useCaloriesData;
