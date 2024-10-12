import styles from '@styles/common/textarea.module.css';
import { FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';
import Text from '../Text';

type TextareaProps<T extends FieldValues> = {
    name: Path<T>;
    id?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    rules?: RegisterOptions<T, Path<T>>;
    register: UseFormRegister<T>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = <T extends FieldValues>(props: TextareaProps<T>) => {
    const { id, name, label, placeholder, defaultValue, rules, register, ...prop } = props;

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
                {...prop}
            />
        </div>
    );
};

export default Textarea;
