'use client';

import styles from '@styles/modal/todaymodeSheet.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Button } from '../common/Button';
import { Emotions, Text } from '../common';
import { BottomSheet } from '../common/Modal';
import { useState } from 'react';
import { DATE_FORMAT, EmojiKey } from '@/constants';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { useUpdateDailySpec } from '@/service/mutations/useUpdateDailySpec';
import { useFetchGoalInProgress } from '@/service/queries';
import dayjs from 'dayjs';

const TodayMoodSheet = () => {
    const { data: goalData } = useFetchGoalInProgress();

    const { isOpen, onClose } = useModal(ModalType.todayMood);
    const { selectedDate } = useSelectedDateStore();

    const formattedDate = dayjs(selectedDate).format(DATE_FORMAT['YYYY-MM-DD']);

    const { data: dailySpec } = useFetchDailySpec(formattedDate);
    const { mutate: createDailySpec } = useCreateDailySpec(formattedDate);
    const { mutate: updateDailySpec } = useUpdateDailySpec(formattedDate);

    const [selectedMood, setSelectedMood] = useState<EmojiKey | null>(null);

    const handleTodayMode = (selectedEmoji: EmojiKey) => {
        setSelectedMood(selectedEmoji);
    };

    const submitTodayMood = async () => {
        if (!selectedMood) return;

        if (dailySpec) {
            const updateData = {
                id: dailySpec.id,
                mood: selectedMood,
                today_weight: dailySpec.today_weight,
            };

            updateDailySpec(updateData);
        } else {
            const initialData = {
                goal_id: goalData?.id!,
                entry_date: formattedDate,
                today_weight: 0,
                mood: selectedMood,
            };

            createDailySpec(initialData);
        }
        onClose();
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <div className={styles.layout}>
                <Text size="xxlg" className={styles.title} bold>
                    오늘의 기분
                </Text>
                <div className={styles.emotionContainer}>
                    <Emotions width={60} height={60} onClick={handleTodayMode} />
                </div>
                <Button role="confirm" onClick={submitTodayMood}>
                    완료
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TodayMoodSheet;
