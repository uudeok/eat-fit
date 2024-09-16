'use client';

import styles from '@styles/modal/exerciseAddFormSheet.module.css';
import { useModal } from '@/hooks';
import { useForm } from 'react-hook-form';
import { EXERCISE_INTENSITY_LABELS, IntensityKeysType } from '@/constants';
import { useState } from 'react';
import { Input, Textarea } from '../common/Form';
import { Button } from '../common/Button';
import { Badge, ListCol, Text } from '../common';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { ModalType } from '../common/Modal/Modals';

type FormValues = {
    exerciseName: string;
    exerciseTime: number | null;
    burnedCalories: number | null;
    exerciseIntensity: IntensityKeysType | null;
    content: string | null;
};

const ExerciseAddFormSheet = () => {
    const [selectedIntensity, setSelectedIntensity] = useState<IntensityKeysType | null>(null);
    const { isOpen, onClose } = useModal(ModalType.exerciseAddForm);
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            exerciseName: '',
            exerciseTime: null,
            burnedCalories: null,
            exerciseIntensity: null,
            content: null,
        },
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    const handleIntensity = (key: IntensityKeysType) => {
        setValue('exerciseIntensity', key);
        setSelectedIntensity(key);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <form onSubmit={onSubmit} className={styles.layout}>
                <SheetHeader content="운동 직접 입력하기" onClose={onClose} />

                <ListCol
                    top={<Text bold>운동 이름 (필수)</Text>}
                    bottom={
                        <Input
                            register={register}
                            rules={{ required: true }}
                            name="exerciseName"
                            placeholder="운동 이름"
                            className={styles.exerciseName}
                        />
                    }
                />

                <div className={styles.exerciseGrid}>
                    <ListCol
                        top={<Text bold>운동 시간 (필수)</Text>}
                        bottom={
                            <Input
                                type="number"
                                register={register}
                                rules={{ required: true }}
                                placeholder="0"
                                name="exerciseTime"
                                unit="분"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                            />
                            // 3자리까지만 받을 수 있고, 첫자리는 0 못오게끔
                        }
                    />

                    <ListCol
                        top={<Text bold>운동 강도 (필수)</Text>}
                        bottom={
                            <div className={styles.badgeContainer}>
                                {Object.entries(EXERCISE_INTENSITY_LABELS).map(([key, label]) => (
                                    <Badge
                                        key={key}
                                        onClick={() => handleIntensity(key as IntensityKeysType)}
                                        isSelected={selectedIntensity === key}
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        }
                    />

                    <ListCol
                        top={<Text bold>소모 칼로리 (선택)</Text>}
                        bottom={
                            <Input
                                type="number"
                                register={register}
                                name="burnedCalories"
                                placeholder="0"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '');
                                }}
                                unit="kcal"
                            />
                            // 3자리까지만 받을 수 있고, 첫자리는 0 못오게끔
                        }
                    />
                </div>

                <Textarea name="content" register={register} placeholder="예시) 자유형 25m 10세트 (선택)" />

                <div className={styles.addBtn}>
                    <Button role="confirm" size="lg" disabled={!selectedIntensity}>
                        추가하기
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default ExerciseAddFormSheet;

// 'use client';

// import styles from '@styles/modal/exerciseAddFormSheet.module.css';
// import { useModal } from '@/hooks';
// import { useForm } from 'react-hook-form';
// import { EXERCISE_INTENSITY_LABELS, IntensityKeysType } from '@/constants';
// import { useState } from 'react';
// import { Input, Textarea } from '../common/Form';
// import { Button } from '../common/Button';
// import { Badge, ListCol, Text } from '../common';
// import { BottomSheet } from '../common/Modal';
// import SheetHeader from '../layout/SheetHeader';

// type FormValues = {
//     exerciseName: string;
//     exerciseTime: string;
//     burnedCalories: string;
//     exerciseIntensity: IntensityKeysType | null;
//     content: string | null;
// };

// const ExerciseAddFormSheet = () => {
//     const [selectedIntensity, setSelectedIntensity] = useState<IntensityKeysType | null>(null);
//     const { isOpen, onClose } = useModal('exerciseAddForm');
//     const { register, handleSubmit, setValue } = useForm<FormValues>({
//         defaultValues: {
//             exerciseName: '',
//             exerciseTime: '',
//             burnedCalories: '',
//             exerciseIntensity: null,
//             content: null,
//         },
//     });

//     const onSubmit = handleSubmit((data) => console.log(data));

//     const handleIntensity = (key: IntensityKeysType) => {
//         setValue('exerciseIntensity', key);
//         setSelectedIntensity(key);
//     };

//     return (
//         <BottomSheet isOpen={isOpen} onClose={onClose}>
//             <form onSubmit={onSubmit} className={styles.layout}>
//                 <SheetHeader content="운동 직접 입력하기" onClose={onClose} />

//                 <ListCol
//                     top={<Text bold>운동 이름 (필수)</Text>}
//                     bottom={
//                         <Input
//                             register={register}
//                             rules={{ required: true }}
//                             name="exerciseName"
//                             placeholder="운동 이름"
//                             className={styles.exerciseName}
//                         />
//                     }
//                 />

//                 <div className={styles.exerciseGrid}>
//                     <ListCol
//                         top={<Text bold>운동 시간 (필수)</Text>}
//                         bottom={
//                             <div className={styles.inputWithUnit}>
//                                 <Input
//                                     register={register}
//                                     rules={{ required: true }}
//                                     placeholder="0"
//                                     name="exerciseTime"
//                                     onInput={(e) => {
//                                         const input = e.target as HTMLInputElement;
//                                         input.value = input.value.replace(/\D/g, '');
//                                     }}
//                                 />
//                                 <Text bold>분</Text>
//                             </div>
//                         }
//                     />

//                     <ListCol
//                         top={<Text bold>운동 강도 (필수)</Text>}
//                         bottom={
//                             <div className={styles.badgeContainer}>
//                                 {Object.entries(EXERCISE_INTENSITY_LABELS).map(([key, label]) => (
//                                     <Badge
//                                         key={key}
//                                         onClick={() => handleIntensity(key as IntensityKeysType)}
//                                         isSelected={selectedIntensity === key}
//                                     >
//                                         {label}
//                                     </Badge>
//                                 ))}
//                             </div>
//                         }
//                     />

//                     <ListCol
//                         top={<Text bold>소모 칼로리 (선택)</Text>}
//                         bottom={
//                             <div className={styles.inputWithUnit}>
//                                 <Input
//                                     register={register}
//                                     name="burnedCalories"
//                                     placeholder="0"
//                                     onInput={(e) => {
//                                         const input = e.target as HTMLInputElement;
//                                         input.value = input.value.replace(/\D/g, '');
//                                     }}
//                                 />
//                                 <Text bold>kcal</Text>
//                             </div>
//                         }
//                     />
//                 </div>

//                 <Textarea name="content" register={register} placeholder="예시) 자유형 25m 10세트 (선택)" />

//                 <div className={styles.addBtn}>
//                     <Button role="confirm" size="lg" disabled={!selectedIntensity}>
//                         추가하기
//                     </Button>
//                 </div>
//             </form>
//         </BottomSheet>
//     );
// };

// export default ExerciseAddFormSheet;
