import styles from '@styles/common/inputbase.module.css';
import { FieldErrors, FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';
import Text from '../Text';

type InputType<T extends FieldValues> = {
    register: UseFormRegister<T>;
    name: Path<T>;
    id?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | number;
    rules?: RegisterOptions<T, Path<T>>;
    errors?: FieldErrors<T>;
    unit?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>(props: InputType<T>) => {
    const { name, id, label, placeholder, defaultValue, rules, register, errors, unit, ...prop } = props;

    const errorMessage = errors && (errors[name]?.message as string);

    return (
        <div className={unit ? styles.layout : ''}>
            <input
                id={id}
                {...(register && register(name, rules))}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`${styles.inputBase}`}
                {...prop}
            />
            <Text size="lg" bold>
                {unit}
            </Text>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default Input;

// import styles from '@styles/common/inputbase.module.css';
// import { FieldErrors, FieldValues, UseFormRegister, Path, RegisterOptions } from 'react-hook-form';
// import Text from '../Text';

// type InputType<T extends FieldValues> = {
//     register: UseFormRegister<T>;
//     name: Path<T>;
//     id?: string;
//     label?: string;
//     placeholder?: string;
//     defaultValue?: string | number;
//     rules?: RegisterOptions<T, Path<T>>;
//     errors?: FieldErrors<T>;
//     unit?: string;
// } & React.InputHTMLAttributes<HTMLInputElement>;

// const Input = <T extends FieldValues>(props: InputType<T>) => {
//     const { name, id, label, placeholder, defaultValue, rules, register, errors, unit, ...prop } = props;

//     const errorMessage = errors && (errors[name]?.message as string);

//     return (
//         <>
//             <input
//                 id={id}
//                 {...(register && register(name, rules))}
//                 placeholder={placeholder}
//                 defaultValue={defaultValue}
//                 className={`${styles.inputBase}`}
//                 {...prop}
//             />
//             <Text size="lg" bold>
//                 {unit}
//             </Text>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//         </>
//     );
// };

// export default Input;
