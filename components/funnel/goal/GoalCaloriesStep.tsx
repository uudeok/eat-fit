'use client';

import styles from '@styles/component/goalSuggestion.module.css';
import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import { ListRow, Text } from '../../common';
import { GoalCaloriesInfoType } from '@/service/@types';
import { Button } from '../../common/Button';
import { useModal } from '@/hooks';
import { ModalType } from '../../common/Modal/OverlayContainer';
import { useEffect, useState } from 'react';
import { addDaysAndResetTime, calculateCaloriesToGoal, formatCurrentDate } from '@/shared/utils';
import { useCache } from '@/hooks/useCache';
import { SESSION_KEYS } from '@/constants';
import { useGoalStore } from './GoalStep';

type Props = {
    onNext: (data: GoalCaloriesInfoType) => void;
};

const GoalCaloriesStep = ({ onNext }: Props) => {
    const { data } = useGoalStore();

    const router = useRouter();
    const { onOpen: openCaloriesEdit } = useModal(ModalType.calorieEdit);
    const { onOpen: openMaintainWeight } = useModal(ModalType.maintainWeight);

    const session = useCache('session');
    // const initialData: GoalRegisterType | null = session.getItem(SESSION_KEYS.GOAL);
    const initalKcalData = session.getRawItem(SESSION_KEYS.GOAL_KACL);

    useEffect(() => {
        if (initalKcalData) {
            const parseData = JSON.parse(initalKcalData);
            setGoalData({
                dailyCalories: parseData.dailyCalories,
                startDate: formatCurrentDate(),
                endDate: addDaysAndResetTime(parseData.goalPeriod),
                goalPeriod: parseData.goalPeriod,
            });
        }
    }, [initalKcalData]);

    const { dailyCalories, daysToGoal } = calculateCaloriesToGoal({ ...data });

    const isWeightDifference = data.targetWeight - data.weight !== 0;

    const [goalData, setGoalData] = useState<GoalCaloriesInfoType>({
        dailyCalories: dailyCalories,
        startDate: formatCurrentDate(),
        endDate: addDaysAndResetTime(daysToGoal),
        goalPeriod: daysToGoal,
    });

    const openCaloriesEditSheet = () => {
        openCaloriesEdit();

        session.setItem(SESSION_KEYS.GOAL_KACL, { ...goalData, standard: dailyCalories });
    };

    const submitGoalData = () => {
        // session.setItem(SESSION_KEYS.GOAL, { ...initialData, ...goalData });
        onNext(goalData);
    };

    const handleBack = () => {
        session.removeItem(SESSION_KEYS.GOAL_KACL);
        router.back();
    };

    const openMaintainModal = () => {
        openMaintainWeight();
    };

    return (
        <div className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={handleBack} />
            <div className={styles.header}>
                <Text bold size="xxlg">
                    추천 계획 완성 !
                </Text>
                <Text bold size="lg" color="var(--grey700)">
                    원하는대로 수정도 가능해요
                </Text>
            </div>

            <div className={styles.suggestion}>
                <Text bold size="xlg">
                    추천 칼로리
                </Text>
                <ListRow
                    left={
                        <Text bold size="xxlg">
                            {goalData.dailyCalories} kcal
                        </Text>
                    }
                    right={
                        <button
                            className={styles.modalBtn}
                            onClick={isWeightDifference ? openCaloriesEditSheet : openMaintainModal}
                        >
                            {isWeightDifference ? '목표 수정' : '유지어터'}
                        </button>
                    }
                />

                <div className={styles.period}>
                    <Icons.Flag width={18} />
                    <Text bold color="var(--grey700)">
                        목표 달성까지 <strong className={styles.strong}>{goalData.goalPeriod}일</strong> 걸려요!
                    </Text>
                </div>

                <Text size="sm" color="var(--grey600)">
                    오늘부터 시작하면 {goalData.endDate}에 끝나요
                </Text>
            </div>

            <div className={styles.nextBtn} onClick={submitGoalData}>
                <Button role="confirm" size="lg">
                    다음
                </Button>
            </div>
        </div>
    );
};

export default GoalCaloriesStep;
