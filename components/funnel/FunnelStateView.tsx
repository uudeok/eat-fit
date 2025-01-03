'use client';

import styles from '@styles/common/funnelVisualizer.module.css';
import { FunnelContext } from '@/shared/context/FunnelProvider';
import { useContext } from 'react';
import { Text } from '../common';

export const FunnelStateVisualizer = () => {
    const { registerData } = useContext(FunnelContext);

    return (
        <div className={styles.container}>
            <Text bold size="lg">
                Funnel State
            </Text>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Key</th>
                        <th className={styles.th}>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(registerData).map(([key, value]) => (
                        <tr key={key} className={styles.tr}>
                            <td className={styles.td}>{key}</td>
                            <td className={styles.td}>{JSON.stringify(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
