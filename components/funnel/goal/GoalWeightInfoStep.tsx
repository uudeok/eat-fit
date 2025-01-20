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
import { goalStore } from './GoalStep';

type Props = {
    onNext: (data: WeightInfoType) => void;
};

const GoalWeightInfoStep = ({ onNext }: Props) => {
    const router = useRouter();
    const { data: registerData } = goalStore();

    /* 정상 체중 범위를 구하기 위한 계산식 */
    const { minWeight, maxWeight } = calculateWeightRange(registerData?.height!);

    const seihgtSchema = createGoalWeightSchema(minWeight, maxWeight);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeightInfoType>({
        resolver: zodResolver(seihgtSchema),
        defaultValues: {
            weight: registerData?.weight,
            targetWeight: registerData?.targetWeight,
        },
    });

    const onSubmit = handleSubmit((data) => {
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
