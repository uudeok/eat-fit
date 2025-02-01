'use client';

import styles from '@styles/component/diaryCalendar.module.css';
import { useCalendar, useModal } from '@/hooks';
import { Badge, ListCol, Spinner, Text } from '../../common';
import Icons from '@/assets';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { EmojiKey } from '@/constants';
import { useFetchGoalsByStatus } from '@/service/queries';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { DecodeDailyStepInRangeType } from '@/service/mappers/stepMapper';
import { Nullable } from '@/@types';
import { ModalType } from '@/components/common/Modal/OverlayContainer';

export type OverViewType = {
    calories: number;
    burnedCalories: number;
    mood: EmojiKey;
};

type CaloriesType = 'low' | 'over';

const DiaryCalendar = ({ dailySteps }: { dailySteps: DecodeDailyStepInRangeType }) => {
    const { onOpen } = useModal(ModalType.monthController);
    const { currentMonth, weekLabels, dateCells } = useCalendar();

    const { setSelectedDate, selectedDate } = useSelectedDateStore();

    const [data, setData] = useState<OverViewType | null>(null);
    const [selectedBadge, setSelectedBadge] = useState<Nullable<CaloriesType>>(null);

    const { data: goalData } = useFetchGoalsByStatus('progress');

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

    useEffect(() => {
        updateCaloriesData(new Date());
    }, []);

    if (!dailySteps || !goalData) return <Spinner />;

    const SUMMARY_LIST = [
        { label: '권장 칼로리', value: goalData.dailyCalories, unit: 'kcal', color: 'var(--grey700)' },
        {
            label: '섭취 칼로리',
            value: data?.calories,
            unit: 'kcal',
            color: 'var(--blue200)',
            icon: <Icons.FillUtensil width={15} />,
        },
        {
            label: '소모 칼로리',
            value: data?.burnedCalories,
            unit: 'kcal',
            color: 'var(--red200)',
            icon: <Icons.Fire width={15} />,
        },
    ];

    const SIGNS: { label: string; background: string; color: string; type: Nullable<CaloriesType> }[] = [
        { label: '적당량👍', background: 'var(--blue200)', color: 'white', type: 'low' },
        { label: '치팅데이?😋', background: 'var(--red200)', color: 'white', type: 'over' },
        { label: '기록X😂', background: 'whitesmoke', color: 'var(--grey700)', type: null },
    ];

    return (
        <>
            <div className={styles.layout}>
                <div className={styles.monthController} onClick={onOpen}>
                    <Text bold size="xlg" color="var(--grey800)">
                        {currentMonth + 1}월의 기록
                    </Text>
                    <Icons.Down width={10} />
                </div>

                <div className={styles.badges}>
                    {SIGNS.map((sign, idx) => (
                        <Badge
                            key={idx}
                            backgroundColor={sign.background}
                            color={sign.color}
                            onClick={() => setSelectedBadge(sign.type)}
                        >
                            {sign.label}
                        </Badge>
                    ))}
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weekLabels.ko.map((week, index) => (
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

                                        if (isOverCalorie) return 'over';
                                        if (isUnderCalorie) return 'low';

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
                                                } ${styles[getCellStyle()]}`}
                                            >
                                                <Text bold size="sm">
                                                    {cell.date.getDate()}
                                                </Text>
                                                {isSelected && <div className={styles.bubble}>선택</div>}
                                            </button>

                                            {selectedBadge === getCellStyle() && (
                                                <div>
                                                    <Text size="xsm" color="var(--grey700)">
                                                        {stepData?.nutrientTotals.calories}
                                                    </Text>
                                                </div>
                                            )}

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
                                <ListCol
                                    key={idx}
                                    top={
                                        <Text bold size="lg" color="var(--grey700)">
                                            {item.icon} {item.label}
                                        </Text>
                                    }
                                    bottom={
                                        <Text bold size="lg" color={item.color}>
                                            {item.value} {item.unit}
                                        </Text>
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.nonData}>
                            <Text bold size="lg" color="var(--grey700)">
                                기록이 없어요 😂
                            </Text>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DiaryCalendar;
