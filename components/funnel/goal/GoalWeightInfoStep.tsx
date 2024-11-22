'use client';

import styles from '@styles/component/goalWeightInfo.module.css';
import Icons from '@/assets';
import { Button } from '../../common/Button';
import { ListCol, Text } from '../../common';
import { useForm } from 'react-hook-form';
import { Input } from '../../common/Form';
import { useRouter } from 'next/navigation';
import { calculateWeightRange } from '@/shared/utils';
import { GoalRegisterType, WeightInfoType } from '@/service/@types/req.type';
import { createGoalWeightSchema, weightValidation } from '@/shared/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCache } from '@/hooks/useCache';
import { SESSION_KEYS } from '@/constants';

type Props = {
    onNext: (data: WeightInfoType) => void;
};

const GoalWeightInfoStep = ({ onNext }: Props) => {
    const router = useRouter();
    const sessionCache = useCache('session');
    const initialData: GoalRegisterType | null = sessionCache.getItem(SESSION_KEYS.GOAL);

    if (!initialData) {
        alert('목표 데이터가 없습니다. 첫 번째 단계로 돌아가 입력해 주세요.');
        router.push('/goals');
        return null;
    }

    /* 정상 체중 범위를 구하기 위한 계산식 */
    const { minWeight, maxWeight } = calculateWeightRange(initialData?.height);

    const seihgtSchema = createGoalWeightSchema(minWeight, maxWeight);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeightInfoType>({
        resolver: zodResolver(seihgtSchema),
        defaultValues: {
            weight: initialData?.weight,
            targetWeight: initialData?.targetWeight,
        },
    });

    const onSubmit = handleSubmit((data) => {
        const goalData = {
            ...initialData,
            ...data,
        };

        sessionCache.setItem(SESSION_KEYS.GOAL, goalData);

        onNext(data);
    });

    return (
        <form onSubmit={onSubmit} className={styles.layout}>
            <Icons.ArrowLeft width={17} onClick={() => router.back()} />

            <div className={styles.header}>
                <Text bold size="xxlg">
                    목표 체중을 알려주세요 !
                </Text>
            </div>

            <ListCol
                top={<Text bold>현재 몸무게</Text>}
                bottom={
                    <Input
                        register={register}
                        name="weight"
                        placeholder="00.0"
                        unit="kg"
                        onInput={weightValidation}
                        errors={errors}
                    />
                }
            />

            <ListCol
                top={<Text bold>목표 몸무게</Text>}
                bottom={
                    <Input
                        register={register}
                        name="targetWeight"
                        placeholder="00.0"
                        unit="kg"
                        onInput={weightValidation}
                        errors={errors}
                    />
                }
            />

            <div className={styles.nextBtn}>
                <Button size="lg" role="confirm">
                    다음
                </Button>
            </div>
        </form>
    );
};

export default GoalWeightInfoStep;
