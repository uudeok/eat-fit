'use client';

import styles from '@styles/common/funnelEditor.module.css';
import React, { useState } from 'react';
import { Text } from '../common';
import { Button } from '../common/Button';
import { Input, Label } from '../common/Form';
import { useForm } from 'react-hook-form';
import { FunnelStore } from '@/hooks/useFunnel';

export const FunnelStateEditor = <T,>({ data, setData }: FunnelStore<T>) => {
    const [state, setState] = useState(data);

    const { register, handleSubmit } = useForm<any>({
        defaultValues: {
            ...data,
        },
    });

    const handleInputChange = (key: string, value: string) => {
        setState((prev: any) => ({ ...prev, [key]: value }));
    };

    const applyChanges = () => {
        setData(state);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(applyChanges)}>
            <Text bold size="lg">
                Editor
            </Text>
            {typeof state === 'object' && state !== null ? (
                Object.entries(state).map(([key, value]) => (
                    <Label label={key} key={key} className={styles.editor}>
                        <Input
                            type="text"
                            register={register}
                            name={key}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className={styles.editorInput}
                        />
                    </Label>
                ))
            ) : (
                <Text>Invalid state</Text>
            )}
            <Button onClick={applyChanges}>변경하기</Button>
        </form>
    );
};
