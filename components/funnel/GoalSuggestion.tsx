'use client';

import styles from '@styles/component/goalSuggestion.module.css';
import Icons from '@/assets';
import { useRouter } from 'next/navigation';
import { ListRow, Text } from '../common';
import { GoalRegisterType, SuggestionGoalType } from '@/service/@types';
import { Button } from '../common/Button';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { useEffect, useState } from 'react';
import { addDaysAndResetTime, calculateCaloriesToGoal, convertDateFormat, resetHoursDate } from '@/shared/utils';

/**
 * GoalSuggestion 컴포넌트의 동작 설명:
 *
 * 1. '목표 수정' 버튼을 클릭하면 현재의 `goalData`를 로컬 스토리지에 저장한다.
 * 2. 사용자가 CaloriesEditSheet에서 목표를 변경하고, 새로운 데이터로 로컬스토리지에 저장한다.
 * 3. 저장된 데이터를 바탕으로 컴포넌트의 상태(`goalData`)를 갱신하여 화면에 렌더링한다.
 * 4. 컴포넌트가 언마운트될 때(컴포넌트가 사라질 때), 로컬스토리지에서 해당 데이터를 삭제한다.
 * 5. `goalData`의 초깃값은 `registerData`를 기반으로 설정되며, 사용자가 변경한 값이 없다면 이 기본값을 유지한다.
 */

type Props = {
    onNext: (data: SuggestionGoalType) => void;
    registerData: GoalRegisterType;
};

const GoalSuggestion = ({ onNext, registerData }: Props) => {
    const { onOpen } = useModal(ModalType.calorieEdit);
    const router = useRouter();

    const storage = localStorage.getItem('dailyCalories');
    const storedData: GoalRegisterType = storage ? JSON.parse(storage) : null;

    const { dailyCalories, daysToGoal } = calculateCaloriesToGoal(registerData);

    const [goalData, setGoalData] = useState<SuggestionGoalType>({
        daily_calories: dailyCalories,
        goal_start_date: resetHoursDate(),
        goal_end_date: addDaysAndResetTime(daysToGoal),
        goal_period: daysToGoal,
    });

    const openCaloriesEditSheet = () => {
        onOpen();

        localStorage.setItem('dailyCalories', JSON.stringify(goalData));
    };

    useEffect(() => {
        if (storedData) {
            setGoalData({
                daily_calories: storedData.daily_calories,
                goal_start_date: resetHoursDate(),
                goal_end_date: addDaysAndResetTime(storedData.goal_period),
                goal_period: storedData.goal_period,
            });
        }

        return () => {
            localStorage.removeItem('dailyCalories');
        };
    }, [storage]);

    const submitGoalData = () => {
        onNext(goalData);
    };

    return (
        <div className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />
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
                            {goalData.daily_calories} kcal
                        </Text>
                    }
                    right={
                        <button className={styles.button} onClick={openCaloriesEditSheet}>
                            목표 수정
                        </button>
                    }
                />

                <div className={styles.period}>
                    <Icons.Flag width={18} />
                    <Text bold color="var(--grey700)">
                        목표 달성까지 <strong className={styles.strong}>{goalData.goal_period}일</strong> 걸려요!
                    </Text>
                </div>

                <Text size="sm" color="var(--grey600)">
                    오늘부터 시작하면 {convertDateFormat(goalData.goal_end_date, 'KYY.MM.DD')} 에 끝나요
                </Text>
            </div>

            <div className={styles.nextBtn} onClick={submitGoalData}>
                <Button role="confirm" size="lg">
                    시작하기
                </Button>
            </div>
        </div>
    );
};

export default GoalSuggestion;
