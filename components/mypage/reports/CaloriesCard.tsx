'use client';

import styles from '@styles/component/caloriesChart.module.css';
import Card from '@/components/common/Card';
import { calculateAverageCalories, calculateCalories, getPastWeekDates, getPastWeeklyDates } from '@/shared/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { CalChartKeys } from '@/constants/charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { Text } from '../../common';
import { useReportStore } from '@/shared/store/useReportStore';
import CaloriesToggleButton from './CaloriesToggleButton';
import useCaloriesData from '@/hooks/useCaloriesData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const oneWeeks = 7;

const CaloriesCard = () => {
    const { setCalories } = useReportStore();
    const [viewMode, setViewMode] = useState<CalChartKeys>('daily');

    const { options, setDailyCaloriesData, setWeeklyAverageCalories, data } = useCaloriesData(viewMode);

    const pastWeekDates = getPastWeekDates('YYYY-MM-DD');
    const pastWeeklyDates = getPastWeeklyDates(oneWeeks);

    const handleToggle = (value: CalChartKeys) => {
        setViewMode(value);
    };

    const startDate = pastWeekDates[0];
    const endDate = pastWeekDates[6];

    const weeklyStartDate = pastWeeklyDates[0].startDate.formatted;
    const weeklyEndDate = pastWeeklyDates[6].endDate.formatted;

    // 일간 데이터
    const { data: dailySteps } = useFetchDailyStepsInRange(startDate, endDate);

    // 주간 데이터
    const { data: weeklyStep } = useFetchDailyStepsInRange(weeklyStartDate, weeklyEndDate);

    useEffect(() => {
        if (dailySteps) {
            const caloriesData = calculateCalories(dailySteps, pastWeekDates);

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

    return (
        <Card
            header={
                <Text color="white" bold size="xlg">
                    일간, 주간별 칼로리를 한눈에 👀
                </Text>
            }
            footer={<CaloriesToggleButton onClick={handleToggle} viewMode={viewMode} />}
        >
            <div className={styles.chart}>
                <Bar options={options} data={data} plugins={[ChartDataLabels]} />
            </div>
        </Card>
    );
};

export default CaloriesCard;
