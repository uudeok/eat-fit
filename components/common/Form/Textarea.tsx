import styles from '@styles/common/textarea.module.css';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import Text from '../Text';

export type FormRules = {
    value: RegExp;
    message: string;
};

type Props = {
    name: string;
    id?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    rules?: FormRules;
    register: UseFormRegister<FieldValues>;
};

const Textarea = (props: Props) => {
    const { id, name, label, placeholder, defaultValue, rules, register } = props;

    return (
        <div className={styles.memo}>
            <label htmlFor={id}>
                <Text size="sm" color="var(--grey700)">
                    {label ? label : '메모'}
                </Text>
            </label>
            <textarea
                id={id}
                {...(register && register(name, rules))}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default Textarea;
