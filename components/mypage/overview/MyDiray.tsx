'use client';

import styles from '@styles/component/overview.module.css';
import { useCalendar } from '@/hooks';
import { ListRow, Spinner, Text } from '../../common';
import Icons from '@/assets';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DATE_FORMAT, EMOJI, EmojiKey } from '@/constants';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { useFetchGoalsByStatus } from '@/service/queries';
import Image from 'next/image';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import DiaryForm from './DiaryForm';

export type OverViewType = {
    calories: number;
    burnedCalories: number;
    mood: EmojiKey;
};

const MyDiray = () => {
    const { prevMonthController, nextMonthController, curMonth, weeks, dateCells, curYear } = useCalendar();

    const { selectedDate, setSelectedDate } = useSelectedDateStore();
    const [data, setData] = useState<OverViewType | null>(null);

    const firstDay = dayjs().year(curYear).month(curMonth).date(1).format(DATE_FORMAT['YYYY-MM-DD']);
    const lastDay = dayjs().year(curYear).month(curMonth).endOf('month').format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySteps } = useFetchDailyStepsInRange(firstDay, lastDay);
    const { data: goalData } = useFetchGoalsByStatus('progress');

    if (!dailySteps || !goalData) return <Spinner />;

    const updateCaloriesData = (date: Date) => {
        const stepData = dailySteps?.steps.find((step) => dayjs(step.dailyStep.entryDate).isSame(dayjs(date), 'day'));
        setData(
            stepData
                ? {
                      calories: stepData.nutrientTotals.calories,
                      burnedCalories: stepData.burnedCaloriesTotals.caloriesBurned,
                      mood: stepData.dailyStep.mood,
                  }
                : null
        );
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        updateCaloriesData(date);
    };

    const SUMMARY_LIST = [
        { label: '권장 칼로리', value: goalData.dailyCalories, unit: 'kcal' },
        { label: '섭취 칼로리', value: data?.calories, unit: 'kcal' },
        { label: '소모 칼로리', value: data?.burnedCalories, unit: 'kcal' },
    ];

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.monthController}>
                    <Text bold size="xlg" color="var(--grey800)">
                        {curMonth + 1}월의 기록
                    </Text>
                    <Icons.Down width={10} />
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weeks.ko.map((week, index) => (
                                <th key={index}>{week}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {dateCells.map((cells, rowIndex) => (
                            <tr key={rowIndex}>
                                {cells.map((cell) => {
                                    const isToday = dayjs(cell.date).isSame(dayjs(), 'day');
                                    const isSelected = dayjs(cell.date).isSame(selectedDate, 'day');
                                    const stepData = dailySteps.steps.find(
                                        (step) => step.dailyStep.entryDate === cell.value
                                    );

                                    const getCellStyle = () => {
                                        if (!stepData) return '';

                                        const isOverCalorie = stepData.nutrientTotals.calories > goalData.dailyCalories;
                                        const isUnderCalorie =
                                            stepData.nutrientTotals.calories < goalData.dailyCalories &&
                                            stepData.nutrientTotals.calories !== 0;

                                        if (isOverCalorie) return styles.over;
                                        if (isUnderCalorie) return styles.low;

                                        return '';
                                    };

                                    return (
                                        <td
                                            key={cell.value}
                                            onClick={() => handleDateClick(cell.date)}
                                            className={styles.date}
                                        >
                                            <button
                                                className={`${styles.dateCell} ${
                                                    cell.monthLabel !== 'current' && styles.notCurrent
                                                } ${getCellStyle()}`}
                                            >
                                                <Text bold size="sm">
                                                    {cell.date.getDate()}
                                                </Text>
                                                {isSelected && <div className={styles.bubble}>선택</div>}
                                            </button>
                                            {isToday && cell.monthLabel === 'current' && (
                                                <div className={styles.todayTextWrapper}>
                                                    <Text size="xsm" color="var(--grey500)">
                                                        오늘
                                                    </Text>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.summary}>
                    {data ? (
                        <div className={styles.summaryInfo}>
                            {SUMMARY_LIST.map((item, idx) => (
                                <ListRow
                                    key={idx}
                                    left={<Text>{item.label}</Text>}
                                    right={
                                        <Text>
                                            {item.value}
                                            {item.unit}
                                        </Text>
                                    }
                                />
                            ))}

                            <ListRow
                                left={<Text>오늘의 기분은?</Text>}
                                right={
                                    data.mood ? (
                                        <div>
                                            <Image
                                                src={`/emotion_fill_${data.mood}.png`}
                                                width={30}
                                                height={30}
                                                alt="mood"
                                            />
                                            <Text>{EMOJI[data.mood]}</Text>
                                        </div>
                                    ) : (
                                        <Image src="/question.png" alt="mood" width={30} height={30} />
                                    )
                                }
                            />
                        </div>
                    ) : (
                        <div className={styles.nonData}>
                            <Text>기록이 없어요 😂</Text>
                        </div>
                    )}
                </div>
            </div>

            <DiaryForm dailySteps={dailySteps} />
        </>
    );
};

export default MyDiray;
