'use client';

import styles from '@styles/common/search.module.css';
import InputBase from './Input';
import Image from 'next/image';
import { useInput } from '@/hooks';

type Props = {
    placeHolder?: string;
    onSubmit: (value: string) => void;
};

const Search = (props: Props) => {
    const { placeHolder, onSubmit } = props;
    const [value, onChangeInput, isValid, setValue] = useInput();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(value);
        // setValue('');
    };

    return (
        <form className={styles.search} onSubmit={handleSearch}>
            <Image src="/images/search.png" width={25} height={20} alt="search" />
            <InputBase
                placeholder={placeHolder ? placeHolder : '입력해주세요'}
                value={value}
                onChange={onChangeInput}
            />
        </form>
    );
};

export default Search;
