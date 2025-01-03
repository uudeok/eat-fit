'use client';

import styles from '@styles/common/funnelEditor.module.css';
import React, { useState, useContext } from 'react';
import { FunnelContext } from '@/shared/context/FunnelProvider';
import { Text } from '../common';
import { Button } from '../common/Button';
import { Input, Label } from '../common/Form';
import { useForm } from 'react-hook-form';

export const FunnelStateEditor = () => {
    const { registerData, setRegisterData } = useContext(FunnelContext);
    const [state, setState] = useState(registerData);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            ...registerData,
        },
    });

    const handleInputChange = (key: string, value: string) => {
        setState((prev: any) => ({ ...prev, [key]: value }));
    };

    const applyChanges = () => {
        setRegisterData(state);
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit(applyChanges)}>
            <Text bold size="lg">
                Editor
            </Text>
            {Object.entries(state).map(([key, value]: any) => (
                <Label label={key} key={key} className={styles.editor}>
                    <Input
                        type="text"
                        register={register}
                        name={key}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className={styles.editorInput}
                    />
                </Label>
            ))}
            <Button onClick={applyChanges}>변경하기</Button>
        </form>
    );
};
