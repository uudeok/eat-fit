'use client';

import styles from '@styles/common/funnelVisualizer.module.css';
import { Text } from '../common';
import { useGoalStore } from './goal/GoalStep';

export const FunnelStateVisualizer = () => {
    const { data } = useGoalStore();
    // const { registerData } = useContext(FunnelContext);

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
                    {Object.entries(data).map(([key, value]) => (
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
