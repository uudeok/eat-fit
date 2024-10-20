'use client';

import styles from '@styles/component/caloriesChart.module.css';
import { generateWeeklyDates, getPastWeekDates, getPastWeeklyDates } from '@/shared/utils';
import type { ChartOptions } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useCallback, useMemo, useState } from 'react';
import { CalChartKeys, CalChartValues } from '@/constants/charts';
import { DecodeDailyStepType, DecodePickExercisesType, DecodePickMealType } from '@/service/mappers/stepMapper';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { Text } from '../common';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const TOGGLES: { label: CalChartValues; key: CalChartKeys }[] = [
    { label: '일간', key: 'daily' },
    { label: '주간', key: 'weekly' },
];

export type DecodeDailyStepListType = {
    dailyStepList: DecodeDailyStepType[];
    mealsList: DecodePickMealType[];
    exercisesList: DecodePickExercisesType[];
};

const oneWeeks = 7;

const CaloriesChart = () => {
    const { pastFullWeekDates, pastWeekDates } = getPastWeekDates();
    const pastWeeklyDates = getPastWeeklyDates(oneWeeks);
    const [viewMode, setViewMode] = useState<CalChartKeys>('daily');

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

    const calculateCalories = useCallback(() => {
        const caloriesArray = pastFullWeekDates.map((date) => {
            const matchingStep = dailySteps?.steps.find((step) => step.dailyStep.entryDate === date);

            return {
                calories: matchingStep ? matchingStep.nutrientTotals.calories : null,
                burnedCalories: matchingStep ? matchingStep.burnedCaloriesTotals.caloriesBurned : null,
            };
        });
        return caloriesArray;
    }, [pastFullWeekDates, dailySteps]);

    const calculateAverageCalories = useCallback(() => {
        const weeklyDates = generateWeeklyDates(oneWeeks);

        const weeklyCalories = weeklyDates.map((week) => {
            const weeklyData = week.map((date) => {
                const matchedStep = weeklyStep?.steps.find((step) => step.dailyStep.entryDate === date);

                return {
                    calories: matchedStep ? matchedStep.nutrientTotals.calories : null,
                    burnedCalories: matchedStep ? matchedStep.burnedCaloriesTotals.caloriesBurned : null,
                };
            });

            const totalCalories = weeklyData.reduce((sum, day) => sum + (day.calories || 0), 0);
            const totalBurnedCalories = weeklyData.reduce((sum, day) => sum + (day.burnedCalories || 0), 0);

            const averageCalories = totalCalories / 7 || 0;
            const averageBurnedCalories = totalBurnedCalories / 7 || 0;

            return {
                averageCalories: Math.round(averageCalories),
                averageBurnedCalories: Math.round(averageBurnedCalories),
            };
        });

        return weeklyCalories;
    }, [generateWeeklyDates, weeklyStep]);

    const calories = useMemo(() => {
        return viewMode === 'daily'
            ? calculateCalories().map((data) => data.calories)
            : calculateAverageCalories().map((data) => data.averageCalories);
    }, [viewMode, calculateCalories, calculateAverageCalories]);

    const burnedCalories = useMemo(() => {
        return viewMode === 'daily'
            ? calculateCalories().map((data) => data.burnedCalories)
            : calculateAverageCalories().map((data) => data.averageBurnedCalories);
    }, [viewMode, calculateCalories, calculateAverageCalories]);

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
