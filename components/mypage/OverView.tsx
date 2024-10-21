'use client';

import styles from '@styles/component/overview.module.css';
import { useCalendar } from '@/hooks';
import { ListRow, LoadingBar, Spinner, Text } from '../common';
import Icons from '@/assets';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DATE_FORMAT } from '@/constants';
import { useFetchDailyStepsInRange } from '@/service/queries/useFetchDailyStep';
import { useFetchGoalsByStatus } from '@/service/queries';
import { CaloiresType } from '@/shared/utils';

const OverView = () => {
    const { prevMonthController, nextMonthController, curMonth, weeks, dateCells, curYear } = useCalendar();
    const [clickedDate, setClickedDate] = useState<Date>(new Date());
    const [matchingData, setMatchingData] = useState<CaloiresType | null>(null);

    const firstDay = dayjs().year(curYear).month(curMonth).date(1).format(DATE_FORMAT['YYYY-MM-DD']);
    const lastDay = dayjs().year(curYear).month(curMonth).endOf('month').format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySteps } = useFetchDailyStepsInRange(firstDay, lastDay);
    const { data: goalData } = useFetchGoalsByStatus('progress');

    if (!dailySteps || !goalData) return <Spinner />;

    console.log(dailySteps);

    const handleDate = (date: Date) => {
        setClickedDate(date);

        const matchingStep = dailySteps?.steps.find((step) =>
            dayjs(step.dailyStep.entryDate).isSame(dayjs(date), 'day')
        );
        if (matchingStep) {
            setMatchingData({
                calories: matchingStep.nutrientTotals.calories,
                burnedCalories: matchingStep.burnedCaloriesTotals.caloriesBurned,
            });
        } else {
            setMatchingData(null);
        }
    };

    console.log(1, matchingData);

    return (
        <>
            <div className={styles.layout}>
                <ListRow
                    left={<Icons.ArrowLeft width={13} onClick={prevMonthController} />}
                    middle={
                        <Text bold size="xlg">
                            {curMonth + 1}월의 기록
                        </Text>
                    }
                    right={<Icons.ArrowRight width={13} onClick={nextMonthController} />}
                />

                <table className={styles.table}>
                    <thead>
                        <tr>
                            {weeks.ko.map((week, index) => (
                                <th key={index}>{week}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {dateCells.map((cells, index) => (
                            <tr key={index}>
                                {cells.map((cell) => {
                                    const isToday = dayjs(cell.date).isSame(dayjs(), 'day');
                                    const isClicked = dayjs(cell.date).isSame(clickedDate, 'day');

                                    const matchingStep = dailySteps.steps.find(
                                        (step) => step.dailyStep.entryDate === cell.value
                                    );

                                    return (
                                        <td
                                            key={cell.value}
                                            onClick={() => handleDate(cell.date)}
                                            className={styles.date}
                                        >
                                            <button
                                                className={`${styles.dateCell} ${
                                                    cell.monthLabel !== 'current' && styles.notCurrent
                                                } 
                                            ${
                                                matchingStep &&
                                                matchingStep.nutrientTotals.calories > goalData.dailyCalories &&
                                                styles.over
                                            }
                                            ${
                                                matchingStep &&
                                                matchingStep.nutrientTotals.calories < goalData.dailyCalories &&
                                                styles.low
                                            }

                                        
                                               
                                               `}
                                            >
                                                <Text bold size="sm">
                                                    {cell.date.getDate()}
                                                </Text>

                                                {isClicked && <div className={styles.bubble}>선택</div>}
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
            </div>

            <div>
                {matchingData && (
                    <div>
                        <ListRow left={<Text>권장 칼로리</Text>} right={<Text>{goalData.dailyCalories}kcal</Text>} />
                        <ListRow left={<Text>섭취한 칼로리</Text>} right={<Text>{matchingData.calories}kcal</Text>} />
                        <ListRow
                            left={<Text>소모한 칼로리</Text>}
                            right={<Text>{matchingData.burnedCalories}kcal</Text>}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default OverView;
