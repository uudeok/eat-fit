'use client';

import styles from '@styles/component/caloriesChart.module.css';
import {
    AverageCaloiresType,
    calculateAverageCalories,
    calculateCalories,
    CaloiresType,
    getPastWeekDates,
    getPastWeeklyDates,
} from '@/shared/utils';
import type { ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { CalChartKeys, CalChartValues } from '@/constants/charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { Text } from '../../common';
import { useReportStore } from '@/shared/store/useReportStore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const TOGGLES: { label: CalChartValues; key: CalChartKeys }[] = [
    { label: '일간', key: 'daily' },
    { label: '주간', key: 'weekly' },
];

const oneWeeks = 7;

const CaloriesChart = () => {
    const { setCalories } = useReportStore();
    const [viewMode, setViewMode] = useState<CalChartKeys>('daily');

    const [dailyCaloriesData, setDailyCaloriesData] = useState<CaloiresType[]>([]);
    const [weeklyAverageCalories, setWeeklyAverageCalories] = useState<AverageCaloiresType[]>([]);

    const { pastFullWeekDates, pastWeekDates } = getPastWeekDates();
    const pastWeeklyDates = getPastWeeklyDates(oneWeeks);

    const pastWeekly = pastWeeklyDates.map((date) => date.endDate.short);

    const labels = viewMode === 'daily' ? pastWeekDates : pastWeekly;

    const startDate = pastFullWeekDates[0];
    const endDate = pastFullWeekDates[6];

    const weeklyStartDate = pastWeeklyDates.map((date) => date.startDate.formatted)[0];
    const weeklyEndDate = pastWeeklyDates.map((date) => date.endDate.formatted)[6];

    // 일간 데이터
    const { data: dailySteps } = useFetchDailyStepsInRange(startDate, endDate);

    // 주간 데이터
    const { data: weeklyStep } = useFetchDailyStepsInRange(weeklyStartDate, weeklyEndDate);

    useEffect(() => {
        if (dailySteps) {
            const caloriesData = calculateCalories(dailySteps, pastFullWeekDates);

            setDailyCaloriesData(caloriesData);
            setCalories(caloriesData);
        }
    }, [dailySteps]);

    useEffect(() => {
        if (weeklyStep) {
            const averageCaloriesData = calculateAverageCalories(weeklyStep);
            setWeeklyAverageCalories(averageCaloriesData);
        }
    }, [weeklyStep]);

    const calories =
        viewMode === 'daily'
            ? dailyCaloriesData?.map((data) => data.calories)
            : weeklyAverageCalories?.map((data) => data.averageCalories);

    const burnedCalories =
        viewMode === 'daily'
            ? dailyCaloriesData?.map((data) => data.burnedCalories)
            : weeklyAverageCalories?.map((data) => data.averageBurnedCalories);

    const data = {
        labels,
        datasets: [
            {
                label: '소모한 칼로리',
                data: burnedCalories,
                backgroundColor: '#FF5274',
                datalabels: {
                    color: '#ef5350',
                },
                categoryPercentage: 1,
                barPercentage: 0.9,
            },
            {
                label: '섭취 칼로리',
                data: calories,
                backgroundColor: '#4593fc',
                datalabels: {
                    color: '#4593fc',
                },
                categoryPercentage: 1,
                barPercentage: 0.9,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
            },
            datalabels: {
                formatter: (value: number) => (value === 0 ? '' : value),
                align: 'top',
                anchor: 'end',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 13,
                        },
                    },
                },
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
            },
        },
    };

    return (
        <>
            <div className={styles.header}>
                <Text color="white" bold size="xlg">
                    일간, 주간별 칼로리를 한눈에 👀
                </Text>
            </div>
            <div className={styles.chart}>
                <Bar options={options} data={data} plugins={[ChartDataLabels]} />
            </div>
            <div className={styles.toggle}>
                {TOGGLES.map((toggle) => (
                    <button
                        onClick={() => setViewMode(toggle.key)}
                        key={toggle.key}
                        className={`${styles.toggelBtn} ${toggle.key === viewMode && styles.selected}`}
                    >
                        {toggle.label}
                    </button>
                ))}
            </div>
        </>
    );
};
export default CaloriesChart;
