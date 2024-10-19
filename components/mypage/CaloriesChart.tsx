'use client';

import styles from '@styles/component/caloriesCharts.module.css';
import { getPastWeekDates, getPastWeeklyDates } from '@/shared/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '../common/Button';
import { useCallback, useState } from 'react';
import { CalChartKeys, CalChartValues } from '@/constants/charts';
import { DecodeDailyStepType, DecodePickExercisesType, DecodePickMealType } from '@/service/mappers/stepMapper';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TOGGLES: { label: CalChartValues; key: CalChartKeys }[] = [
    { label: '일간', key: 'daily' },
    { label: '주간', key: 'weekly' },
];

export type DecodeDailyStepListType = {
    dailyStepList: DecodeDailyStepType[];
    mealsList: DecodePickMealType[];
    exercisesList: DecodePickExercisesType[];
};

const CaloriesCharts = () => {
    const { pastFullWeekDates, pastWeekDates } = getPastWeekDates();
    const pastWeeklyDates = getPastWeeklyDates();
    const [viewLabel, setViewLabel] = useState<CalChartKeys>('daily');

    const pastWeekly = pastWeeklyDates.map((date) => date.endDate.short);

    const labels = viewLabel === 'daily' ? pastWeekDates : pastWeekly;

    const startDate = pastFullWeekDates[0];
    const endDate = pastFullWeekDates[6];

    const startWeeklyDate = pastWeeklyDates.map((date) => date.startDate.formatted)[0];
    const endWeeklyDate = pastWeeklyDates.map((date) => date.endDate.formatted)[6];

    // 일간
    const { data: dailySteps } = useFetchDailyStepsInRange(startDate, endDate);

    // 주간
    const { data: weeklyStep } = useFetchDailyStepsInRange(startWeeklyDate, endWeeklyDate);

    const caloriesArray = pastFullWeekDates.map((date) => {
        const matchingStep = dailySteps?.steps.find((step) => step.dailyStep.entryDate === date);

        return {
            calories: matchingStep ? matchingStep.nutrientTotals.calories : null,
            burnedCalories: matchingStep ? matchingStep.burnedCaloriesTotals.caloriesBurned : null,
        };
    });

    const generateWeeklyDates = () => {
        return pastWeeklyDates.map(({ startDate }) =>
            Array.from({ length: 7 }, (_, idx) => dayjs(startDate.formatted).add(idx, 'day').format('YYYY-MM-DD'))
        );
    };

    const calculateAverageCalories = useCallback(() => {
        const weeklyDates = generateWeeklyDates();

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

    const calories =
        viewLabel === 'daily'
            ? caloriesArray.map((data) => data.calories)
            : calculateAverageCalories().map((data) => data.averageCalories);
    const burnedCalories =
        viewLabel === 'daily'
            ? caloriesArray.map((data) => data.burnedCalories)
            : calculateAverageCalories().map((data) => data.averageBurnedCalories);

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: '',
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    };

    ChartJS.defaults.set('plugins.datalabels', {
        align: 'top',
        anchor: 'end',
        labels: {
            title: {
                font: {
                    weight: 'bold',
                },
            },
        },
    });

    const data = {
        labels,
        datasets: [
            {
                label: '소모한 칼로리',
                data: burnedCalories,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                datalabels: {
                    color: '#ef5350',
                },
            },
            {
                label: '섭취 칼로리',
                data: calories,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                datalabels: {
                    color: '#4593fc',
                },
            },
        ],
    };

    return (
        <div className={styles.chart}>
            <Bar options={options} data={data} plugins={[ChartDataLabels]} />

            <div className={styles.toggleBtn}>
                {TOGGLES.map((toggle) => (
                    <Button
                        role="round"
                        key={toggle.key}
                        onClick={() => setViewLabel(toggle.key)}
                        selected={toggle.key === viewLabel}
                    >
                        {toggle.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};
export default CaloriesCharts;
