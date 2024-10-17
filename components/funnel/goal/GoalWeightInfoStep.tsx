'use client';

import styles from '@styles/component/goalWeightInfo.module.css';
import Icons from '@/assets';
import { Button } from '../../common/Button';
import { ListCol, Text } from '../../common';
import { useForm } from 'react-hook-form';
import { Input } from '../../common/Form';
import { useRouter } from 'next/navigation';
import { calculateWeightRange, getLocalStorageItem, setLocalStorageItem, weightValidation } from '@/shared/utils';
import { GoalRegisterType, WeightInfoType } from '@/service/@types/req.type';

type Props = {
    onNext: (data: WeightInfoType) => void;
};

const GoalWeightInfoStep = ({ onNext }: Props) => {
    const router = useRouter();
    const initialData: GoalRegisterType | null = getLocalStorageItem('goalData');

    if (!initialData) {
        throw new Error('로컬스토리지에 goalData 데이터가 없습니다');
    }

    /* 정상 체중 범위를 구하기 위한 계산식 */
    const { minWeight, maxWeight } = calculateWeightRange(initialData?.height);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WeightInfoType>({
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

        setLocalStorageItem('goalData', goalData);

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
                        rules={{
                            required: '몸무게를 입력해주세요',
                            min: {
                                value: 30,
                                message: '최소 30kg 이상 입력 가능합니다.',
                            },
                            max: {
                                value: 250,
                                message: '최대 250kg까지 입력 가능합니다.',
                            },
                        }}
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
                        rules={{
                            required: '목표 몸무게를 입력해주세요',
                            min: {
                                value: minWeight,
                                message: `정상 체중 범위 내의 ${minWeight}kg 이상 입력 가능합니다`,
                            },
                            max: {
                                value: maxWeight,
                                message: `정상 체중 범위 내의 ${maxWeight}kg 이하로 입력 가능합니다`,
                            },
                        }}
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
