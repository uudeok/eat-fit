'use client';

import styles from '@styles/component/weightChart.module.css';
import type { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { getPastWeekDates } from '@/shared/utils';
import { ListRow, Text } from '../common';
import { useFetchGoalsByStatus } from '@/service/queries';
import Icons from '@/assets';
import { MAX_WEIGHT, MIN_WEIGHT } from '@/constants';
import { useCallback } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, ChartDataLabels);

const WeightChart = () => {
    const { pastFullWeekDates, pastWeekDates } = getPastWeekDates();

    const startDate = pastFullWeekDates[0];
    const endDate = pastFullWeekDates[6];

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { data: dailySteps } = useFetchDailyStepsInRange(startDate, endDate);

    const GOAL_WEIGHT = [
        { value: goalData?.weight, label: '시작 몸무게', icon: <Icons.FillLaughFace width={15} /> },
        { value: goalData?.targetWeight, label: '목표 몸무게', icon: <Icons.Flag width={15} /> },
    ];

    const getDailyWeight = useCallback(() => {
        const weightArray = pastFullWeekDates.map((date) => {
            const machingStep = dailySteps?.steps.find((step) => step.dailyStep.entryDate === date);

            return {
                weight:
                    machingStep && machingStep.dailyStep.todayWeight > 0
                        ? machingStep.dailyStep.todayWeight
                        : goalData?.weight,
            };
        });
        return weightArray;
    }, [dailySteps, goalData, pastFullWeekDates]);

    const options: ChartOptions<'line'> = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                formatter: (value: number) => (value === goalData?.weight ? '' : value),
                align: 'top',
                anchor: 'end',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 17,
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
                min: MIN_WEIGHT,
                max: MAX_WEIGHT,
            },
        },
    };

    const data = {
        labels: pastWeekDates,
        datasets: [
            {
                data: getDailyWeight().map((data) => data.weight),
                fill: false,
                borderColor: '#4593fc',
                tension: 0.1,
                datalabels: {
                    color: '#64a8ff',
                },
            },
        ],
    };

    return (
        <>
            <div className={styles.header}>
                {GOAL_WEIGHT.map((weight, idx) => (
                    <ListRow
                        className={styles.weightSummary}
                        key={idx}
                        left={
                            <Text color="white" size="xlg" bold>
                                {weight.icon} {weight.label}
                            </Text>
                        }
                        right={
                            <Text size="xlg" color="white" bold>
                                {weight.value}kg
                            </Text>
                        }
                    />
                ))}
            </div>
            <div className={styles.chart}>
                <Line data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </>
    );
};

export default WeightChart;
