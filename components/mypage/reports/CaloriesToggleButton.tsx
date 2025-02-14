'use client';

import styles from '@styles/component/caloriesToggleButton.module.css';
import { CalChartKeys, CalChartValues } from '@/constants/charts';

const TOGGLES: { label: CalChartValues; key: CalChartKeys }[] = [
    { label: '일간', key: 'daily' },
    { label: '주간', key: 'weekly' },
];

type TToggleButton = {
    onClick: (value: CalChartKeys) => void;
    viewMode: CalChartKeys;
};

const CaloriesToggleButton = ({ onClick, viewMode }: TToggleButton) => {
    return (
        <div className={styles.toggle}>
            {TOGGLES.map((toggle) => (
                <button
                    onClick={() => onClick(toggle.key)}
                    key={toggle.key}
                    className={`${styles.toggelBtn} ${toggle.key === viewMode && styles.selected}`}
                >
                    {toggle.label}
                </button>
            ))}
        </div>
    );
};

export default CaloriesToggleButton;
