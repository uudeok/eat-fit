'use client';

import styles from '@styles/modal/todaymodeSheet.module.css';
import { useModal } from '@/hooks';
import { ModalType } from '../common/Modal/OverlayContainer';
import { Button } from '../common/Button';
import { Emotions, Text } from '../common';
import { BottomSheet } from '../common/Modal';
import { useState } from 'react';
import { EmojiKey } from '@/constants';
import { useSelectedDateStore } from '@/shared/store/useSelectedDateStore';
import { useFetchDailySpec } from '@/service/queries/useFetchDailySpec';
import { useCreateDailySpec } from '@/service/mutations/useCreateDailySpec';
import { useUpdateDailySpec } from '@/service/mutations/useUpdateDailySpec';
import { useFetchGoalsByStatus } from '@/service/queries';
import { encodeCreateDailySpec, encodeUpdateDailySpec } from '@/service/mappers/dailyMapper';

const TodayMoodSheet = () => {
    const { data: goalData } = useFetchGoalsByStatus('progress');

    const { isOpen, onClose } = useModal(ModalType.todayMood);
    const { getFormattedDate } = useSelectedDateStore();

    const formattedDate = getFormattedDate();

    const { data: dailySpec } = useFetchDailySpec(formattedDate);
    const { mutate: createDailySpec } = useCreateDailySpec(formattedDate);
    const { mutate: updateDailySpec } = useUpdateDailySpec();

    const [selectedMood, setSelectedMood] = useState<EmojiKey | null>(null);

    const handleTodayMode = (selectedEmoji: EmojiKey) => {
        setSelectedMood(selectedEmoji);
    };

    const submitTodayMood = async () => {
        if (!selectedMood) return;

        if (dailySpec) {
            const dailySpecData = {
                id: dailySpec.id,
                mood: selectedMood,
                todayWeight: dailySpec.todayWeight,
                diary: dailySpec.diary,
            };

            const updateData = encodeUpdateDailySpec({ ...dailySpecData });

            updateDailySpec(updateData);
        } else {
            const initialData = {
                goalId: goalData?.id!,
                entryDate: formattedDate,
                todayWeight: 0,
                mood: selectedMood,
            };

            const createData = encodeCreateDailySpec({ ...initialData });

            createDailySpec(createData);
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
