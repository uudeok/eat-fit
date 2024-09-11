import styles from '@styles/common/inputbase.module.css';
import { FieldErrors, FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';

type InputType<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    id?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | number;
    rules?: RegisterOptions<T, Path<T>>;
    errors?: FieldErrors<T>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>(props: InputType<T>) => {
    const { name, id, label, placeholder, defaultValue, rules, register, errors, ...prop } = props;

    const errorMessage = errors && (errors[name]?.message as string);

    return (
        <>
            <input
                id={id}
                {...(register && register(name, rules))}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`${styles.inputBase}`}
                {...prop}
            />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </>
    );
};

export default Input;
