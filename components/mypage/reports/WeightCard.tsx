'use client';

import Card from '@/components/common/Card';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { getPastWeekDates } from '@/shared/utils';
import { useFetchGoalsByStatus } from '@/service/queries';
import { useEffect } from 'react';
import { useReportStore } from '@/shared/store/useReportStore';
import WeightChartHeader from './WeightChartHeader';
import useWeightData from '@/hooks/useWeightData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, ChartDataLabels);

const WeightCard = () => {
    const { setWeeklyWeight } = useReportStore();
    const pastFullWeekDates = getPastWeekDates('YYYY-MM-DD');

    const startDate = pastFullWeekDates[0];
    const endDate = pastFullWeekDates[6];

    const { data: goalData } = useFetchGoalsByStatus('progress');
    const { data: dailySteps } = useFetchDailyStepsInRange(startDate, endDate);

    const { data, options, getDailyWeight } = useWeightData(dailySteps, goalData);

    useEffect(() => {
        if (goalData && dailySteps) {
            const dailyWeightData = getDailyWeight();
            setWeeklyWeight(dailyWeightData);
        }
    }, [goalData, dailySteps]);

    return (
        <Card header={<WeightChartHeader />}>
            <div className="h-[200px]">
                <Line data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </Card>
    );
};

export default WeightCard;
