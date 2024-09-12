import styles from '@styles/modal/mealTimeSheet.module.css';
import { useModal } from '@/hooks';
import { BottomSheet } from '../common/Modal';
import SheetHeader from '../layout/SheetHeader';
import { Button } from '../common/Button';
import TextToggle from '../common/TextToggle';
import { Input } from '../common/Form';
import { FieldValues, useForm } from 'react-hook-form';
import { ListRow, Text } from '../common';
import { usePathname } from 'next/navigation';

type FormValues = {
    period: string;
    hour: string;
    minutes: string;
};

const MealTimeSheet = () => {
    const path = usePathname();
    const { isOpen, onClose } = useModal('mealTime');
    const { register, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            hour: '',
            minutes: '',
        },
    });

    const handlePeriodToggle = (value: string) => {
        console.log(value);
        setValue('period', value);
    };

    const handleFormSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <SheetHeader content="언제 먹었나요?" onClose={onClose} />

            <form className={styles.layout} onSubmit={handleSubmit(handleFormSubmit)}>
                <TextToggle left="오전" right="오후" onClick={handlePeriodToggle} />

                <div className={styles.timeContainer}>
                    <ListRow
                        left={
                            <Input
                                register={register}
                                rules={{ required: true }}
                                name="hour"
                                placeholder="00"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '').slice(0, 2);
                                }}
                                onBlur={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.padStart(2, '0');
                                }}
                            />
                        }
                        middle={
                            <Text bold size="xlg">
                                :
                            </Text>
                        }
                        right={
                            <Input
                                register={register}
                                rules={{ required: true }}
                                name="minutes"
                                placeholder="00"
                                onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/\D/g, '').slice(0, 2);
                                }}
                                onBlur={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.padStart(2, '0');
                                }}
                            />
                        }
                    />
                </div>

                <div className={styles.submitBtn}>
                    <Button role="confirm" size="lg">
                        완료
                    </Button>
                </div>
            </form>
        </BottomSheet>
    );
};

export default MealTimeSheet;
