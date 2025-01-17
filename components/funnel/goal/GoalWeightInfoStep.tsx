'use client';

import styles from '@styles/component/goalWeightInfo.module.css';
import Icons from '@/assets';
import { Button } from '../../common/Button';
import { ListCol, Text } from '../../common';
import { useForm } from 'react-hook-form';
import { Input } from '../../common/Form';
import { useRouter } from 'next/navigation';
import { calculateWeightRange } from '@/shared/utils';
import { WeightInfoType } from '@/service/@types/req.type';
import { createGoalWeightSchema, weightValidation } from '@/shared/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoalStore } from './GoalStep';

type Props = {
    onNext: (data: WeightInfoType) => void;
};

const GoalWeightInfoStep = ({ onNext }: Props) => {
    const { data } = useGoalStore();
    const router = useRouter();

    // const session = useCache('session');
    // const initialData: GoalRegisterType | null = session.getItem(SESSION_KEYS.GOAL);

    /* 정상 체중 범위를 구하기 위한 계산식 */
    const { minWeight, maxWeight } = calculateWeightRange(data?.height!);

    const seihgtSchema = createGoalWeightSchema(minWeight, maxWeight);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeightInfoType>({
        resolver: zodResolver(seihgtSchema),
        defaultValues: {
            weight: data?.weight,
            targetWeight: data?.targetWeight,
        },
    });

    const onSubmit = handleSubmit((data) => {
        // session.setItem(SESSION_KEYS.GOAL, { ...initialData, ...data });
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
                        inputMode="numeric"
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
                        inputMode="numeric"
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
