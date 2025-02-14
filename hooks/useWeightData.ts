import { getPastWeekDates } from '@/shared/utils';
import { ChartOptions } from 'chart.js';
import { MAX_WEIGHT, MIN_WEIGHT } from '@/constants';
import { DecodeGoalType } from '@/service/mappers/goalMapper';
import { useCallback } from 'react';
import { DecodeDailyStepInRangeType } from '@/service/mappers/stepMapper';

const useWeightData = (dailySteps?: DecodeDailyStepInRangeType, goalData?: DecodeGoalType) => {
    const pastWeekDates = getPastWeekDates('M.D');
    const pastFullWeekDates = getPastWeekDates('YYYY-MM-DD');

    const getDailyWeight = useCallback(() => {
        return pastFullWeekDates.map((date) => {
            const matchingStep = dailySteps?.steps.find((step) => step.dailyStep.entryDate === date);

            return matchingStep && matchingStep.dailyStep.todayWeight > 0
                ? matchingStep.dailyStep.todayWeight
                : goalData?.weight || 0;
        });
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
                data: getDailyWeight(),
                fill: false,
                borderColor: '#4593fc',
                tension: 0.1,
                datalabels: {
                    color: '#64a8ff',
                },
            },
        ],
    };

    return { data, options, getDailyWeight };
};

export default useWeightData;
