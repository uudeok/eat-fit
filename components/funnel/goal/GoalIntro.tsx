'use client';

import styles from '@styles/component/goalIntro.module.css';
import { Text } from '../../common';
import { Button } from '../../common/Button';

type Props = {
    onNext: () => void;
};

const GoalIntro = ({ onNext }: Props) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.layout}>
                <Text bold size="xlg">
                    잇-핏에 오신 걸 환영해요! 🥰
                </Text>
                <Text color="var(--grey500)">건강한 관리를 위해 잇핏이 도와드릴게요</Text>

                <Button role="confirm" size="lg" onClick={() => onNext()}>
                    목표 설정하기
                </Button>
            </div>
        </div>
    );
};

export default GoalIntro;
