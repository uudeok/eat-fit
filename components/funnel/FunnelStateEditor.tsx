'use client';

import styles from '@styles/common/funnelEditor.module.css';
import React, { useState } from 'react';
import { Text } from '../common';
import { Button } from '../common/Button';
import { Input, Label } from '../common/Form';
import { useForm } from 'react-hook-form';
import { useGoalStore } from './goal/GoalStep';

export const FunnelStateEditor = () => {
    const { data, setData } = useGoalStore();
    const [state, setState] = useState(data);

    const { register, handleSubmit } = useForm({
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
