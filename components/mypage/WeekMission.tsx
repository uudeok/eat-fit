'use client';

import styles from '@styles/component/weekMission.module.css';
import Icons from '@/assets';
import dayjs from 'dayjs';
import { ListRow, Text } from '../common';
import { getWeekDates } from '@/shared/utils';
import { useFetchDailySteps } from '@/service/queries/useFetchDailyStep';

const WeekMission = () => {
    const { weekDays, weekFullDates } = getWeekDates();
    const today = dayjs().date();

    const queriesResults = useFetchDailySteps(weekFullDates);

    console.log(queriesResults);

    return (
        <div className={styles.layout}>
            <ListRow
                className={styles.header}
                left={
                    <div className={styles.title}>
                        <Icons.FillFire width={15} />
                        <Text bold size="xlg">
                            주간 미션
                        </Text>
                    </div>
                }
                right={<Text bold>달성률 0%</Text>}
            />

            <div className={styles.weeksWrapper}>
                {weekDays.map((week, index) => (
                    <div key={index}>
                        <div className={`${styles.date} ${week > today && styles.disabled}`}>{week}일</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekMission;
