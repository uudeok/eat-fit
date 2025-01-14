'use client';

import styles from '@styles/component/goalBasicInfo.module.css';
import Image from 'next/image';
import { Button } from '../../common/Button';
import { ListCol, Text } from '../../common';
import { Input } from '../../common/Form';
import { useForm } from 'react-hook-form';
import { ActivityLevelType, BasicInfoType, GenderType } from '@/service/@types/req.type';
import { useContext, useState } from 'react';
import { ageValidation, heightValidation } from '@/shared/utils/validation';
import { FunnelContext } from '@/shared/context/FunnelProvider';

type Props = {
    onNext: (data: BasicInfoType) => void;
};

const GENDER = [
    { key: 'F', value: '여성', emj: 'female.png', selected: 'female_fill.png' },
    { key: 'M', value: '남성', emj: 'male.png', selected: 'male_fill.png' },
];

const ACTIVITY_LEVEL = [
    { key: 'very_low', value: '매우 적음', emj: 'very_low.png', content: '혼자 있는게 제일 좋아 ! 난 집순이,집돌이' },
    { key: 'low', value: '적음', emj: 'low.png', content: '주로 앉아있는 직장인, 학생' },
    { key: 'moderate', value: '보통', emj: 'moderate.png', content: '난 주 1~2회 가볍게 운동해' },
    { key: 'high', value: '많음', emj: 'high.png', content: '꾸준히 하는 운동이 있어' },
    { key: 'very_high', value: '매우 많음', emj: 'very_high.png', content: '육체노동 혹은 매일 땀흘리면서 운동해' },
];

const GoalBasicInfoStep = ({ onNext }: Props) => {
    const { registerData } = useContext(FunnelContext);

    const [selectedGender, setSelectedGender] = useState<GenderType | null>(registerData?.gender || null);
    const [selectedActivityLevel, setSelectedActivityLevel] = useState<ActivityLevelType | null>(
        registerData?.activityLevel || null
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<BasicInfoType>({
        defaultValues: {
            gender: registerData?.gender,
            age: registerData?.age,
            height: registerData?.height,
            activityLevel: registerData?.activityLevel,
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (!selectedGender || !selectedActivityLevel) {
            return;
        }

        onNext(data);
    });

    const handleGenderSelect = (gender: GenderType) => {
        setSelectedGender(gender);
        setValue('gender', gender);
    };

    const handleActivitySelect = (activityLevel: ActivityLevelType) => {
        setSelectedActivityLevel(activityLevel);
        setValue('activityLevel', activityLevel);
    };

    return (
        <form className={styles.layout} onSubmit={onSubmit}>
            <div className={styles.header}>
                <Text bold size="xxlg">
                    기본 정보를 알려주세요!
                </Text>
            </div>

            <ListCol
                top={<Text bold>성별</Text>}
                bottom={
                    <div className={styles.genderSelect}>
                        {GENDER.map((g) => (
                            <div
                                key={g.key}
                                className={styles.gender}
                                onClick={() => handleGenderSelect(g.key as GenderType)}
                            >
                                <Image
                                    src={selectedGender === g.key ? `/images/${g.selected}` : `/images/${g.emj}`}
                                    alt={g.key}
                                    width={100}
                                    height={100}
                                    priority
                                />
                                <Text bold color="var(--grey600)">
                                    {g.value}
                                </Text>
                            </div>
                        ))}
                    </div>
                }
            />

            <ListCol
                top={<Text bold>나이</Text>}
                bottom={
                    <Input
                        type="number"
                        inputMode="numeric"
                        register={register}
                        name="age"
                        placeholder="0"
                        unit="세"
                        rules={{
                            required: '나이를 입력해주세요',
                            min: {
                                value: 10,
                                message: '최소 두자리 이상부터 입력 가능합니다',
                            },
                            max: {
                                value: 100,
                                message: '100살 이하로 입력 가능합니다',
                            },
                        }}
                        errors={errors}
                        onInput={ageValidation}
                    />
                }
            />

            <ListCol
                top={<Text bold>키</Text>}
                bottom={
                    <Input
                        type="number"
                        inputMode="numeric"
                        register={register}
                        name="height"
                        placeholder="0"
                        unit="cm"
                        rules={{
                            required: '키를 입력해주세요',
                            min: {
                                value: 100,
                                message: '최소 100cm 이상 입력 가능합니다',
                            },
                            max: {
                                value: 230,
                                message: '230cm 이하로 입력 가능합니다',
                            },
                        }}
                        errors={errors}
                        onInput={heightValidation}
                    />
                }
            />

            <ListCol
                top={<Text bold>활동량</Text>}
                bottom={
                    <div className={styles.activity}>
                        {ACTIVITY_LEVEL.map((act) => (
                            <div
                                key={act.key}
                                className={`${styles.emoji} ${
                                    selectedActivityLevel === act.key && styles.selectedActivity
                                }`}
                                onClick={() => handleActivitySelect(act.key as ActivityLevelType)}
                            >
                                <Image src={`/images/${act.emj}`} alt={act.key} width={70} height={70} />
                                <Text size="sm" bold color="var(--grey600)">
                                    {act.value}
                                </Text>
                                <Text size="xsm" bold color="var(--grey600)" className={styles.content}>
                                    {act.content}
                                </Text>
                            </div>
                        ))}
                    </div>
                }
            />

            <div className={styles.nextBtn}>
                <Button role="confirm" size="lg">
                    다음
                </Button>
            </div>
        </form>
    );
};

export default GoalBasicInfoStep;
